package com.vibe.kosmo.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vibe.kosmo.member.LoginRequest;
import com.vibe.kosmo.member.Member;
import com.vibe.kosmo.member.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * 선생님 수업 방식의 로그인 처리 필터
 *
 * POST /member/login 요청을 가로채서:
 * 1. JSON body → LoginRequest로 파싱 (username, password)
 * 2. UsernamePasswordAuthenticationToken 생성
 * 3. AuthenticationManager로 인증 (UserDetailsServiceImpl.loadUserByUsername 호출)
 * 4. 성공 시: accessToken + refreshToken + member 정보 JSON 응답
 * 5. 실패 시: 401 + 에러 JSON 응답
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper mapper;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenManager jwtTokenManager;  // ← 반드시 대입해야 NullPointerException 방지
    private final MemberRepository memberRepository; // ← name, email 조회용

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtTokenManager jwtTokenManager,
                                   MemberRepository memberRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenManager = jwtTokenManager;        // 핵심! 빠지면 NPE 발생
        this.memberRepository = memberRepository;
        this.setFilterProcessesUrl("/member/login");   // 로그인 URL 지정
        this.mapper = new ObjectMapper();
    }

    // ─── 1단계: 로그인 시도 ─────────────────────────────────────
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response)
            throws AuthenticationException {
        try {
            // JSON body 파싱: { "username": "test@test.com", "password": "1234" }
            LoginRequest loginRequest = mapper.readValue(request.getInputStream(), LoginRequest.class);

            // Spring Security 인증 토큰 생성
            // loginRequest.getUsername()에 이메일이 담겨 있음
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),  // 이메일 (username 키로 전달됨)
                            loginRequest.getPassword()
                    );

            // AuthenticationManager → UserDetailsServiceImpl.loadUserByUsername(email) 호출
            return authenticationManager.authenticate(token);

        } catch (IOException e) {
            throw new RuntimeException("로그인 요청 JSON 파싱 실패", e);
        }
    }

    // ─── 2단계: 인증 성공 → JWT 발급 + 회원 정보 응답 ──────────────
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {

        // accessToken, refreshToken 발급
        String accessToken = jwtTokenManager.createAccessToken(authResult);
        String refreshToken = jwtTokenManager.createRefreshToken(authResult);

        // 인증된 사용자 이메일로 DB에서 추가 정보 조회 (nickname 등)
        String email = authResult.getName();
        String nickname = "";
        Optional<Member> memberOpt = memberRepository.findByEmail(email);
        if (memberOpt.isPresent()) {
            nickname = memberOpt.get().getNickname();
        }

        // 응답 DTO 구성
        JwtAuthDTO jwtAuthDTO = new JwtAuthDTO();
        jwtAuthDTO.setUsername(email);       // 프론트에서 data.username으로 접근
        jwtAuthDTO.setName(nickname);        // 프론트에서 data.name으로 접근 (닉네임)
        jwtAuthDTO.setEmail(email);          // 프론트에서 data.email으로 접근
        jwtAuthDTO.setAccessToken(accessToken);
        jwtAuthDTO.setRefreshToken(refreshToken);

        String result = mapper.writeValueAsString(jwtAuthDTO);

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
    }

    // ─── 3단계: 인증 실패 → 401 응답 ───────────────────────────────
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed)
            throws IOException, ServletException {

        Map<String, String> error = new HashMap<>();
        error.put("error", "LOGIN_FAILED");
        error.put("message", "이메일 또는 비밀번호가 올바르지 않습니다.");

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(mapper.writeValueAsString(error));
    }
}

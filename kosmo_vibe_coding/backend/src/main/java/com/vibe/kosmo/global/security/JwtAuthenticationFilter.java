package com.vibe.kosmo.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vibe.kosmo.member.LoginRequest;
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

/**
 * 선생님 수업 방식의 로그인 처리 필터
 *
 * POST /member/login 요청을 가로채서:
 * 1. JSON body → LoginRequest로 파싱
 * 2. UsernamePasswordAuthenticationToken 생성
 * 3. AuthenticationManager로 인증
 * 4. 성공 시: JwtTokenManager로 accessToken + refreshToken 발급 → JSON 응답
 * 5. 실패 시: 401 + 에러 메시지 JSON 응답
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // ─── 필드 ───────────────────────────────────────
    private final ObjectMapper mapper;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenManager jwtTokenManager;  // ← 반드시 대입해야 NullPointerException 방지

    // ─── 생성자 ─────────────────────────────────────
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtTokenManager jwtTokenManager) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenManager = jwtTokenManager;        // ← 핵심! 이게 빠지면 NPE 발생
        this.setFilterProcessesUrl("/member/login");   // 로그인 URL 지정
        this.mapper = new ObjectMapper();
    }

    // ─── 1단계: 로그인 시도 ─────────────────────────
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response)
            throws AuthenticationException {
        try {
            // JSON body 파싱: {"email":"test@test.com", "password":"1234"}
            LoginRequest loginRequest = mapper.readValue(request.getInputStream(), LoginRequest.class);

            // Spring Security 인증 토큰 생성
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),    // username 역할
                            loginRequest.getPassword()  // password
                    );

            // AuthenticationManager가 UserDetailsService.loadUserByUsername() 호출
            return authenticationManager.authenticate(token);

        } catch (IOException e) {
            // return null 대신 예외를 던져서 원인 추적 가능하게 함
            throw new RuntimeException("로그인 요청 JSON 파싱 실패", e);
        }
    }

    // ─── 2단계: 인증 성공 → JWT 발급 ──────────────────
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {

        // accessToken (짧은 만료시간), refreshToken (긴 만료시간) 발급
        String accessToken = jwtTokenManager.createAccessToken(authResult);
        String refreshToken = jwtTokenManager.createRefreshToken(authResult);

        // 응답 DTO 구성
        JwtAuthDTO jwtAuthDTO = new JwtAuthDTO();
        jwtAuthDTO.setUsername(authResult.getName());   // 이메일(ID)
        jwtAuthDTO.setAccessToken(accessToken);
        jwtAuthDTO.setRefreshToken(refreshToken);

        // JSON 문자열로 변환 후 응답에 쓰기
        String result = mapper.writeValueAsString(jwtAuthDTO);

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
    }

    // ─── 3단계: 인증 실패 → 401 응답 ──────────────────
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

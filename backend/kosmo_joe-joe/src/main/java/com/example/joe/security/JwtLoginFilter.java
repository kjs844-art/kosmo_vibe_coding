package com.example.joe.security;

import com.example.joe.member.MemberDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
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
 * React login request comes here first before Spring Security checks the id and password.
 */
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

    // JSON 문자열을 Java 객체(MemberDTO)로 바꿔주는 Jackson 도구입니다.
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 로그인 성공 후 JWT 토큰을 만들어 주는 담당 클래스입니다.
    private final JwtTokenManager jwtTokenManager;

    public JwtLoginFilter(AuthenticationManager authenticationManager, JwtTokenManager jwtTokenManager) {
        super(authenticationManager);
        this.jwtTokenManager = jwtTokenManager;
        // 이 필터가 감시할 로그인 URL입니다. React는 POST /member/login 으로 요청합니다.
        setFilterProcessesUrl("/member/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException {

        System.out.println("JwtLoginFilter : 로그인 시도 중");

        try {
            // React가 보낸 JSON body를 MemberDTO로 변환합니다.
            MemberDTO memberDTO = objectMapper.readValue(request.getInputStream(), MemberDTO.class);

            // username/password를 Spring Security가 이해하는 인증용 토큰으로 포장합니다.
            UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());

            // 실제 인증 판단은 AuthenticationManager에게 맡깁니다.
            return this.getAuthenticationManager().authenticate(token);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain,
        Authentication authResult
    ) throws IOException, ServletException {
        System.out.println("JwtLoginFilter : 로그인 성공!");

        // 인증 성공 결과(authResult)를 기준으로 Access Token과 Refresh Token을 각각 발급합니다.
        String accessToken = jwtTokenManager.createAccessToken(authResult);
        String refreshToken = jwtTokenManager.createRefreshToken(authResult);

        // React가 헤더에서도 Access Token을 읽을 수 있게 Bearer 형식으로 담습니다.
        response.addHeader("Authorization", "Bearer " + accessToken);

        // React가 응답 본문에서도 쉽게 읽도록 Map을 JSON으로 변환해 보냅니다.
        Map<String, Object> map = new HashMap<>();
        map.put("access-token", accessToken);
        map.put("refresh-token", refreshToken);

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(map));
    }
}

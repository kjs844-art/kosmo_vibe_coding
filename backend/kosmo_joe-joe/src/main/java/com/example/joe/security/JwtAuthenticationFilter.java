package com.example.joe.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    // 요청에 담긴 JWT를 검증하고 Authentication 객체로 바꿔주는 담당 클래스입니다.
    private final JwtTokenManager jwtTokenManager;

    // 토큰에서 꺼낸 username으로 실제 회원 정보를 다시 조회하는 서비스입니다.
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
        AuthenticationManager manager,
        JwtTokenManager jwtTokenManager,
        UserDetailsService userDetailsService
    ) {
        super(manager);
        this.jwtTokenManager = jwtTokenManager;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain
    ) throws IOException, ServletException {

        // React가 보낸 Authorization 헤더를 꺼냅니다. 예: "Bearer eyJhbGciOi..."
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            // RFC Bearer 규칙에 맞춰 앞의 "Bearer " 7글자를 제거하고 순수 JWT만 남깁니다.
            String jwtToken = token.substring(7);

            try {
                // 토큰 서명/만료시간을 먼저 검증합니다.
                if (!jwtTokenManager.validateToken(jwtToken)) {
                    chain.doFilter(request, response);
                    return;
                }

                // 토큰에서 username을 꺼낸 뒤, UserDetailsService가 실제 회원 정보를 조회합니다.
                String username = jwtTokenManager.getUsername(jwtToken);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // 조회된 사용자와 권한 목록을 Security가 이해하는 Authentication으로 포장합니다.
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // Spring Security가 현재 요청을 로그인된 사용자 요청으로 인식하도록 저장합니다.
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("JWT 토큰 검증 완료 : 인증 성공");
            } catch (Exception e) {
                System.out.println("유효하지 않거나 만료된 JWT 토큰입니다.");
            }
        }

        // 다음 필터로 요청을 넘깁니다. 이 줄이 없으면 요청이 멈춥니다.
        chain.doFilter(request, response);
    }
}

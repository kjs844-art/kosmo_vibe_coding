package com.vibe.kosmo.global.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * 모든 API 요청마다 JWT 토큰을 검증하는 필터
 * 요청 헤더의 "Authorization: Bearer {token}" 을 파싱해 SecurityContext에 인증 정보를 세팅합니다.
 *
 * JwtAuthenticationFilter(로그인 처리)와 역할이 다릅니다:
 *  - JwtAuthenticationFilter : POST /member/login → 로그인 시도 → 토큰 발급
 *  - JwtVerificationFilter   : 모든 요청 → 헤더의 토큰 검증 → SecurityContext 세팅
 */
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // HTTP 요청 헤더에서 Bearer 토큰 파싱
        String token = resolveToken(request);

        // 토큰 검증 및 SecurityContext 인증 바인딩
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

package com.vibe.kosmo.global.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * 선생님 수업 방식의 JWT 토큰 생성/검증 클래스
 *
 * - createAccessToken : accessToken 생성 (짧은 만료시간 = accessValidTime)
 * - createRefreshToken: refreshToken 생성 (긴 만료시간  = refreshValidTime)
 * - validateToken     : 토큰 유효성 검사
 * - getUsername       : 토큰에서 사용자 이름(이메일) 추출
 */
@Component
public class JwtTokenManager {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.accessValidTime}")
    private Long accessValidTime;

    @Value("${jwt.refreshValidTime}")
    private Long refreshValidTime;

    private SecretKey key;

    // 서버 시작 시 secretKey 문자열 → SecretKey 객체로 변환
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // accessToken 생성 (짧은 만료시간 사용)
    public String createAccessToken(Authentication authentication) {
        return createToken(authentication, accessValidTime);
    }

    // refreshToken 생성 (긴 만료시간 사용 ← accessValidTime 사용하면 버그!)
    public String createRefreshToken(Authentication authentication) {
        return createToken(authentication, refreshValidTime);
    }

    // 실제 토큰 생성 메서드
    private String createToken(Authentication authentication, Long validTime) {
        return Jwts.builder()
                .subject(authentication.getName())  // 사용자 이메일(ID)
                .issuer(issuer)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + validTime))
                .signWith(key)
                .compact();
    }

    // 토큰 파싱 → Claims(payload) 반환
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(this.key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 토큰 유효성 검사 (만료/위조 여부 확인)
    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 토큰에서 사용자 이름(이메일) 꺼내기
    public String getUsername(String token) {
        return getClaimsFromToken(token).getSubject();
    }
}

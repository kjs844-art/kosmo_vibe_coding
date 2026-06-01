package com.example.joe.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenManager {

    // application.properties의 jwt.secretKey 값을 읽어서 서명 비밀키로 사용합니다.
    @Value("${jwt.secretKey}")
    private String secretKey;

    // Access Token은 짧게 유지해서 로그인 상태 확인용으로 사용합니다.
    @Value("${jwt.accessValidTime}")
    private Long accessValidTime;

    // Refresh Token은 Access Token을 다시 발급받기 위한 긴 유효시간 토큰입니다.
    @Value("${jwt.refreshValidTime}")
    private Long refreshValidTime;

    // 토큰 안에 찍히는 발행자 이름입니다. 강사님 화면의 issur 오타를 그대로 맞췄습니다.
    @Value("${jwt.issur}")
    private String issur;

    // 최종적으로 조립된 암호화 키를 보관할 객체입니다.
    private Key key;

    @PostConstruct
    public void init() {
        // 문자열 secretKey를 바이트 배열로 바꾼 뒤, HMAC-SHA 규격의 진짜 암호화 Key 객체로 변환합니다.
        this.key = Keys.hmacShaKeyFor(this.secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(Authentication authentication) {
        // 외부에서 Access Token이 필요할 때 호출하는 메서드입니다.
        return this.createToken(authentication, accessValidTime);
    }

    public String createRefreshToken(Authentication authentication) {
        // 외부에서 Refresh Token이 필요할 때 호출하는 메서드입니다.
        return this.createToken(authentication, refreshValidTime);
    }

    private String createToken(Authentication authentication, Long validTime) {
        // Authentication 안에서 로그인 성공한 사용자 아이디를 꺼냅니다.
        String username = authentication.getName();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validTime);

        // JWT 안에 subject, issuer, 발행시간, 만료시간을 넣고 secretKey로 서명합니다.
        return Jwts.builder()
            .setSubject(username)
            .setIssuer(issur)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(this.key)
            .compact();
    }

    public boolean validateToken(String token) {
        // 토큰의 서명과 만료시간을 검증합니다. 문제가 있으면 예외가 발생합니다.
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername(String token) {
        // 토큰 Payload의 subject 영역에서 username을 꺼냅니다.
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        // 전달받은 토큰을 내 secretKey로 검증하고 Payload 안의 Claims를 꺼냅니다.
        return Jwts.parser()
            .verifyWith((javax.crypto.SecretKey) this.key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}

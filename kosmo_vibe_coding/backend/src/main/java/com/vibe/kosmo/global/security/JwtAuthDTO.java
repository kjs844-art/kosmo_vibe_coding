package com.vibe.kosmo.global.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 로그인 성공 시 React로 반환하는 응답 DTO
// username, accessToken, refreshToken 세 가지를 담아서 보냄
@Getter
@Setter
@ToString
public class JwtAuthDTO {

    private String username;      // 로그인한 사용자 이메일(ID)
    private String accessToken;   // 짧은 만료시간 토큰 (API 요청에 사용)
    private String refreshToken;  // 긴 만료시간 토큰 (accessToken 재발급용)
}

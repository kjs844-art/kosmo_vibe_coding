package com.vibe.kosmo.global.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 로그인 성공 시 React로 반환하는 응답 DTO
// username, name(nickname), email, accessToken, refreshToken 포함
@Getter
@Setter
@ToString
public class JwtAuthDTO {

    private String username;      // 로그인 ID (이메일)
    private String name;          // 닉네임 (member.nickname)
    private String email;         // 이메일 (member.email)
    private String accessToken;   // 짧은 만료시간 토큰
    private String refreshToken;  // 긴 만료시간 토큰
}

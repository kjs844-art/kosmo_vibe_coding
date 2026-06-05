package com.vibe.kosmo.member;

import lombok.Getter;
import lombok.Setter;

// 선생님 수업 방식: frontend에서 "username"과 "password" 키로 JSON을 보냄
// { "username": "test@test.com", "password": "1234" }
@Getter
@Setter
public class LoginRequest {

    // 프론트에서 "username" 키로 보내는 값 (실제로는 이메일이 들어옴)
    private String username;

    private String password;

    // 기존 email 방식도 호환되도록 getter 추가
    public String getEmail() {
        return username; // username 필드에 이메일이 들어오므로 동일하게 반환
    }
}

package com.example.joe.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDTO {

    // React 회원가입/로그인 화면과 백엔드가 주고받는 회원 데이터 상자입니다.
    @NotBlank(message = "아이디는 필수 항목입니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수 항목입니다.")
    private String password;

    // 회원가입에서 비밀번호 재확인용으로만 사용합니다. 로그인에는 필요하지 않습니다.
    private String passwordCheck;

    @NotBlank(message = "이름은 필수 항목입니다.")
    @Size(min = 2, max = 10, message = "이름은 2자 이상, 10자 이하로 입력해주세요.")
    private String name;

    @NotBlank(message = "이메일은 필수 항목입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;
}

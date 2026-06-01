package com.example.joe.member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequiredArgsConstructor
@Slf4j
public class MemberApiController {

    // Controller -> Service 흐름: 화면에서 받은 회원가입 데이터를 실제 처리 담당에게 넘깁니다.
    private final MemberService memberService;

    // React 회원가입 화면이 POST /member/join 으로 보낸 JSON 데이터를 MemberDTO로 받습니다.
    @PostMapping("/join")
    public int join(@Valid @RequestBody MemberDTO memberDTO, BindingResult bindingResult) {
        log.info("member join request: {}", memberDTO);

        // @NotBlank, @Email, @Size 같은 DTO 검증 규칙에 실패하면 0을 돌려줍니다.
        if (bindingResult.hasErrors()) {
            log.warn("member join validation failed: {}", bindingResult.getFieldError().getDefaultMessage());
            return 0;
        }

        // 프론트에서 보낸 password와 passwordCheck가 같은지 백엔드에서도 한 번 더 확인합니다.
        if (memberDTO.getPasswordCheck() == null || !memberDTO.getPassword().equals(memberDTO.getPasswordCheck())) {
            log.warn("member join password check failed");
            return 0;
        }

        // 지금은 DB 저장 전 단계라 Service가 받은 DTO를 그대로 돌려주는 구조입니다.
        MemberDTO resultDTO = memberService.join(memberDTO);

        if (resultDTO != null) {
            return 1;
        } else {
            return 0;
        }
    }
}

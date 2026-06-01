package com.example.joe.member;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class MemberService implements UserDetailsService {

    // DB 연결 전까지 회원가입한 회원을 임시로 보관하는 메모리 저장소입니다.
    private final Map<String, MemberDTO> members = new ConcurrentHashMap<>();

    private final PasswordEncoder passwordEncoder;

    public MemberService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public MemberDTO join(MemberDTO memberDTO) {
        log.info("member join service: {}", memberDTO);

        // DB가 없으므로 현재는 서버가 켜져 있는 동안만 메모리에 회원 정보를 저장합니다.
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        members.put(memberDTO.getUsername(), memberDTO);

        return memberDTO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // JwtLoginFilter가 넘긴 username으로 가입된 회원을 찾아 Spring Security 검증 객체로 바꿉니다.
        MemberDTO memberDTO = members.get(username);

        if (memberDTO == null) {
            throw new UsernameNotFoundException("가입되지 않은 아이디입니다: " + username);
        }

        return User.withUsername(memberDTO.getUsername())
            .password(memberDTO.getPassword())
            .roles("USER")
            .build();
    }
}

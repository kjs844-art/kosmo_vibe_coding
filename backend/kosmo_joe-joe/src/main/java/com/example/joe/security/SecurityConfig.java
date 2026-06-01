package com.example.joe.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // 회원가입 때 비밀번호를 암호화하고, 로그인 때 입력 비밀번호와 암호화 비밀번호를 비교합니다.
        return new BCryptPasswordEncoder();
    }

    // Spring Security의 전체 보안 규칙을 조립하는 설정 메서드입니다.
    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity security,
        AuthenticationConfiguration authenticationConfiguration,
        JwtTokenManager jwtTokenManager,
        UserDetailsService userDetailsService
    ) throws Exception {
        security
            // React(localhost:5173)에서 Spring Boot(localhost:8050)로 요청할 수 있게 CORS를 켭니다.
            .cors(Customizer.withDefaults())
            // JWT/API 방식에서는 form hidden CSRF 토큰을 쓰지 않으므로 수업 단계에서는 비활성화합니다.
            .csrf(csrf -> csrf.disable())
            // JWT는 서버 세션에 로그인 상태를 저장하지 않으므로 매 요청을 토큰으로만 판단합니다.
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // 로그인/회원가입은 토큰이 없어도 접근할 수 있어야 합니다.
                .requestMatchers("/member/join", "/member/login").permitAll()
                // 공지 목록은 로그인한 사용자만 접근할 수 있습니다.
                .requestMatchers("/notice/list").authenticated()
                // 공지 작성 URL은 ADMIN 권한이 필요합니다.
                .requestMatchers("/notice/add").hasRole("ADMIN")
                // 위에서 지정하지 않은 나머지는 수업 단계에서는 우선 접근 허용합니다.
                .anyRequest().permitAll()
            )
            // 화면 기반 form login/http basic이 아니라 JSON + JWT 필터로 로그인합니다.
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())
            // filter: /member/login 요청을 JwtLoginFilter가 먼저 받아서 JSON 로그인 처리를 합니다.
            .addFilter(new JwtLoginFilter(
                authenticationConfiguration.getAuthenticationManager(),
                jwtTokenManager
            ))
            // filter: 로그인 이후 요청의 Authorization Bearer 토큰을 검사합니다.
            .addFilter(new JwtAuthenticationFilter(
                authenticationConfiguration.getAuthenticationManager(),
                jwtTokenManager,
                userDetailsService
            ));

        return security.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 프론트 개발 서버 주소 2가지를 허용합니다. localhost와 127.0.0.1은 브라우저가 다르게 봅니다.
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        // React가 응답 헤더의 Authorization 토큰을 읽을 수 있게 노출합니다.
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

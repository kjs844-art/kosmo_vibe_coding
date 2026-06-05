package com.vibe.kosmo.global.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // 기존 JwtTokenProvider (토큰 검증용 필터에 사용)
    private final JwtTokenProvider jwtTokenProvider;

    // 선생님 방식 JwtTokenManager (로그인 필터에 사용)
    private final JwtTokenManager jwtTokenManager;

    // 비밀번호 인코더 (BCrypt 해시)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager Bean 등록 (로그인 인증 처리에 필요)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // 보안 필터 체인 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           AuthenticationManager authenticationManager) throws Exception {

        // 선생님 방식 로그인 처리 필터 생성 (POST /member/login)
        JwtAuthenticationFilter jwtAuthenticationFilter =
                new JwtAuthenticationFilter(authenticationManager, jwtTokenManager);

        // 기존 토큰 검증 필터 (모든 API 요청에서 Bearer 토큰 검사)
        JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenProvider);

        http
            // CSRF 비활성화 (JWT 방식은 세션/쿠키 불사용)
            .csrf(AbstractHttpConfigurer::disable)
            // CORS 허용 (React 5173 포트)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // 세션 사용 안 함 (JWT가 매 요청 인증)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            // 요청별 권한 설정
            .authorizeHttpRequests(auth -> auth
                // 선생님 방식 로그인/회원가입 URL 허용
                .requestMatchers(
                    "/member/login",
                    "/member/join",
                    "/members/join",
                    "/members/signup"
                ).permitAll()
                // 기존 프로젝트 API 허용
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/boards/**", "/api/notices/**", "/api/stocks/**").permitAll()
                .requestMatchers("/api/hello").permitAll()
                .requestMatchers("/", "/error", "/h2-console/**").permitAll()
                // 나머지는 인증 필요
                .anyRequest().authenticated()
            )
            // 선생님 방식: addFilter (로그인 처리 필터)
            .addFilter(jwtAuthenticationFilter)
            // 기존 방식: addFilterBefore (토큰 검증 필터)
            .addFilterBefore(jwtVerificationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // CORS 설정 (React 개발 서버 주소 허용)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // React Vite 개발 서버 주소 허용
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:5173",
            "http://localhost:5174",  // 포트 충돌 시 자동 변경된 주소
            "http://127.0.0.1:5173",
            "http://localhost:3000"
        ));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}

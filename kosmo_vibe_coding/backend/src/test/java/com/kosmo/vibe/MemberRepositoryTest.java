package com.kosmo.vibe;

import com.kosmo.vibe.member.Member;
import com.kosmo.vibe.member.MemberRepository;
import com.kosmo.vibe.member.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;
import com.kosmo.vibe.global.config.JpaConfig;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // src/test/resources/application.yml 사용
@Import(JpaConfig.class)
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("멤버 생성 및 조회 테스트")
    public void testSaveAndFindMember() {
        // given
        Member member = Member.builder()
                .email("test@example.com")
                .password("encoded_password")
                .nickname("tester")
                .role(Role.USER)
                .build();

        // when
        Member savedMember = memberRepository.save(member);
        Member foundMember = memberRepository.findById(savedMember.getId()).orElse(null);

        // then
        assertThat(foundMember).isNotNull();
        assertThat(foundMember.getEmail()).isEqualTo("test@example.com");
        assertThat(foundMember.getRole()).isEqualTo(Role.USER);
        assertThat(foundMember.getCreatedAt()).isNotNull(); // JpaAuditing 작동 확인
        System.out.println("✅ Member 엔티티 생성 성공! 생성 시간: " + foundMember.getCreatedAt());
    }
}

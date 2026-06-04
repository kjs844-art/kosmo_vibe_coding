package com.example.joe;

import com.example.joe.member.Member;
import com.example.joe.member.MemberRepository;
import com.example.joe.member.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;
import com.example.joe.global.config.JpaConfig;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // src/test/resources/application.yml ?ъ슜
@Import(JpaConfig.class)
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("硫ㅻ쾭 ?앹꽦 諛?議고쉶 ?뚯뒪??)
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
        assertThat(foundMember.getCreatedAt()).isNotNull(); // JpaAuditing ?묐룞 ?뺤씤
        System.out.println("??Member ?뷀떚???앹꽦 ?깃났! ?앹꽦 ?쒓컙: " + foundMember.getCreatedAt());
    }
}

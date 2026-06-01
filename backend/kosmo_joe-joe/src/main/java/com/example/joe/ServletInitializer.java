package com.example.joe;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {

	// WAR 배포 환경에서 이 Spring Boot 애플리케이션을 시작할 때 사용하는 설정입니다.
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(KosmoJoeJoeApplication.class);
	}

}

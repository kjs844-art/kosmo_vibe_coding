package com.example.joe.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	// 브라우저가 Spring Boot 루트 주소(/)로 들어오면 index.jsp를 보여줍니다.
	@GetMapping("/")
	public String home() {
		return "index";
	}
}

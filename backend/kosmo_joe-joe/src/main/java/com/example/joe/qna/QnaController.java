package com.example.joe.qna;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class QnaController {
	
	// JSP 방식 QnA 페이지 라우팅입니다. React QnA 화면과는 별도로 남아있는 Spring MVC 경로입니다.
	// URL: /qna/list -> 메서드: list() -> JSP: qna/list.jsp
	@GetMapping("/qna/list")
	public String list() {
		return "qna/list";
	}

	// URL: /board/add -> 메서드: add() -> JSP: board/add.jsp
	@GetMapping("/board/add")
	public String add() {
		return "board/add";
	}
	
	// URL: /board/detail -> 메서드: detail() -> JSP: board/detail.jsp
	@GetMapping("/board/detail")
	public String detail() {
		return "board/detail";
	}
}

package com.example.joe.noticeservice;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*
 * [Service 역할]
 * Controller가 URL 요청을 받으면, 실제 데이터 준비는 Service에게 위임합니다.
 * @Service = Spring이 이 클래스를 업무 처리 객체로 관리하게 하는 annotation입니다.
 */
@Service
public class NoticeService {

	public List<NoticeDTO> getList() {
		List<NoticeDTO> list = new ArrayList<>();
		
		NoticeDTO first = new NoticeDTO();
		first.setId(1L);
		first.setTitle("골든 로프 홈페이지가 오픈되었습니다!");
		first.setDate("2026-05-28");
		list.add(first);
		
		NoticeDTO second = new NoticeDTO();
		second.setId(2L);
		second.setTitle("6월 신제품: 무화과 깜빠뉴 출시 안내");
		second.setDate("2026-05-25");
		list.add(second);
		
		NoticeDTO third = new NoticeDTO();
		third.setId(3L);
		third.setTitle("매장 운영 시간 변경 안내");
		third.setDate("2026-05-20");
		list.add(third);
		
		return list;
	}
	
	/*
	 * [list 데이터 생성 흐름]
	 * 1. NoticeDTO 객체 생성
	 * 2. dto.setVariable("DTO")로 문자 데이터 저장
	 * 3. dto.setNumber(1)로 숫자 데이터 저장
	 * 4. return dto로 Controller에게 완성된 데이터 상자를 돌려줌
	 */
	public NoticeDTO list() {
		// 객체 생성 공식 = 클래스명 변수명 = new 생성자명()
		// NoticeDTO는 클래스명이면서 데이터 타입입니다.
		NoticeDTO dto = new NoticeDTO();
		
		// setter 공식 = dto 안의 멤버변수에 값을 넣는 메서드
		// variable = "DTO"
		dto.setVariable("DTO");
		
		// number = 1
		dto.setNumber(1);
		
		System.out.println("noting");
		
		// return = 오른쪽 값을 메서드를 호출한 곳으로 돌려주고 메서드 종료
		return dto;
	}
	
	public NoticeDTO detail() {
		NoticeDTO dto = new NoticeDTO();
		
		// variable = "DTODTODTO"
		dto.setVariable("DTODTODTO");
		
		// number = 2
		dto.setNumber(2);
		
		return dto;
	}
}

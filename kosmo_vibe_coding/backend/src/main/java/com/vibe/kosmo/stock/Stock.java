package com.vibe.kosmo.stock;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stocks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stock {

    @Id
    @Column(length = 10)
    private String code; // 종목 코드 (예: "005930")

    @Column(nullable = false, length = 100)
    private String name; // 종목명 (예: "삼성전자")

    @Column(nullable = false)
    private Integer price; // 실시간 현재가

    @Column(nullable = false)
    private Integer changePrice; // 전일비 변동 금액

    @Column(nullable = false)
    private Double changeRate; // 전일비 변동률

    @Column(nullable = false)
    private Boolean isRising; // 상승 여부 (true = 상승/보합, false = 하락)

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "stock_histories", joinColumns = @JoinColumn(name = "stock_code"))
    @Column(name = "historic_price")
    @Builder.Default
    private List<Integer> history = new ArrayList<>(); // 주가 변동 히스토리 이력 (최근 7회)
}

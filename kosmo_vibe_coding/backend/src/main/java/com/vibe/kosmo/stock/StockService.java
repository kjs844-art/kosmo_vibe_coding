package com.vibe.kosmo.stock;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final Random random = new Random();

    // 초기 인기 주식 리스트
    @PostConstruct
    @Transactional
    public void initStockData() {
        if (stockRepository.count() > 0) {
            log.info("기존 주식 데이터가 존재합니다. 초기 데이터 적재를 건너뜁니다.");
            return;
        }

        log.info("초기 주식 시뮬레이션 데이터를 DB에 적재합니다...");
        List<Stock> initialStocks = new ArrayList<>();

        // 1. 삼성전자
        initialStocks.add(Stock.builder()
                .code("005930")
                .name("삼성전자")
                .price(74500)
                .changePrice(300)
                .changeRate(0.4)
                .isRising(true)
                .history(new ArrayList<>(List.of(73000, 73500, 72800, 74000, 73900, 74200, 74500)))
                .build());

        // 2. 비바리퍼블리카(토스)
        initialStocks.add(Stock.builder()
                .code("999999")
                .name("비바리퍼블리카(토스)")
                .price(52000)
                .changePrice(1500)
                .changeRate(2.97)
                .isRising(true)
                .history(new ArrayList<>(List.of(48000, 49500, 50000, 51000, 50500, 51500, 52000)))
                .build());

        // 3. SK하이닉스
        initialStocks.add(Stock.builder()
                .code("000660")
                .name("SK하이닉스")
                .price(186200)
                .changePrice(-1200)
                .changeRate(-0.64)
                .isRising(false)
                .history(new ArrayList<>(List.of(188000, 189500, 185000, 187000, 186800, 187400, 186200)))
                .build());

        // 4. NAVER
        initialStocks.add(Stock.builder()
                .code("035420")
                .name("NAVER")
                .price(178000)
                .changePrice(2000)
                .changeRate(1.14)
                .isRising(true)
                .history(new ArrayList<>(List.of(173000, 175000, 172000, 176000, 175500, 176000, 178000)))
                .build());

        // 5. 카카오
        initialStocks.add(Stock.builder()
                .code("035720")
                .name("카카오")
                .price(48100)
                .changePrice(-150)
                .changeRate(-0.31)
                .isRising(false)
                .history(new ArrayList<>(List.of(49000, 49500, 48200, 48700, 48400, 48250, 48100)))
                .build());

        stockRepository.saveAll(initialStocks);
        log.info("초기 주식 데이터 5개 적재 완료.");
    }

    /**
     * 5초마다 주가를 변동시키는 스케줄러 (시뮬레이터)
     */
    @Scheduled(fixedDelay = 5000)
    @Transactional
    public void simulateStockPrice() {
        List<Stock> stocks = stockRepository.findAll();
        if (stocks.isEmpty()) {
            return;
        }

        log.info("주식 시뮬레이터 가동 - 주가 변동 중...");
        for (Stock stock : stocks) {
            int oldPrice = stock.getPrice();
            
            // 랜덤하게 -2.0% ~ +2.0% 변동률 생성
            double changePercent = (random.nextDouble() * 4.0 - 2.0) / 100.0;
            int priceDiff = (int) (oldPrice * changePercent);
            
            // 주가 변동액 및 현재가 보정 (최소 금액 1,000원 이하로 내려가지 않게 가드)
            int newPrice = Math.max(1000, oldPrice + priceDiff);
            // 호가 단위를 100원 단위로 반올림하여 현실감 부여
            newPrice = (newPrice / 100) * 100;
            priceDiff = newPrice - oldPrice;

            // 기준 전일비 계산을 위한 모의 전일종가 (삼성전자 74,200원 등 변동 없다고 가정하고 현재가에서 변동 계산)
            // 간단하게: 전일가 = newPrice - priceDiff
            double rate = ((double) priceDiff / (double) oldPrice) * 100.0;
            // 소수점 둘째 자리까지 반올림
            rate = Math.round(rate * 100.0) / 100.0;

            stock.setPrice(newPrice);
            stock.setChangePrice(Math.abs(priceDiff));
            stock.setChangeRate(rate);
            stock.setIsRising(priceDiff >= 0);

            // 최근 7회 역사 기록 갱신
            List<Integer> history = stock.getHistory();
            if (history == null) {
                history = new ArrayList<>();
            }
            history.add(newPrice);
            if (history.size() > 7) {
                history.remove(0); // 가장 오래된 이력 제거
            }
            stock.setHistory(history);
        }

        stockRepository.saveAll(stocks);
    }

    /**
     * 주식 목록 전체 조회
     */
    @Transactional(readOnly = true)
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    /**
     * 개별 주식 조회
     */
    @Transactional(readOnly = true)
    public Stock getStockByCode(String code) {
        return stockRepository.findById(code).orElse(null);
    }
}

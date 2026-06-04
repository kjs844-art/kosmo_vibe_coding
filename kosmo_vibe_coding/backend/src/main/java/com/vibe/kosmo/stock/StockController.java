package com.vibe.kosmo.stock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StockController {

    private final StockService stockService;

    /**
     * 인기 주식 전체 목록 조회
     * GET /api/stocks
     */
    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        log.info("인기 주식 목록 조회 요청 수신");
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }

    /**
     * 개별 주식 상세 조회
     * GET /api/stocks/{code}
     */
    @GetMapping("/{code}")
    public ResponseEntity<Stock> getStockByCode(@PathVariable("code") String code) {
        log.info("개별 주식 상세 조회 요청 수신 - 종목코드: {}", code);
        Stock stock = stockService.getStockByCode(code);
        if (stock == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stock);
    }
}

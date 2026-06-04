package com.kosmo.vibe;

import java.net.Socket;
import java.net.InetSocketAddress;

public class TestSocket {
    public static void main(String[] args) {
        // Supabase 호스트와 포트
        String host = "aws-1-ap-northeast-2.pooler.supabase.com";
        int port = 6543;
        
        System.out.println("네트워크 소켓 연결 테스트 시작: " + host + ":" + port);
        
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(host, port), 5000); // 5초 타임아웃
            System.out.println("✅ 네트워크 연결 성공! 해당 DB 서버로 접근이 가능합니다.");
        } catch (Exception e) {
            System.err.println("❌ 네트워크 연결 실패: " + e.getMessage());
        }
    }
}

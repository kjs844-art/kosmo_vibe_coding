package com.example.joe;

import java.net.Socket;
import java.net.InetSocketAddress;

public class TestSocket {
    public static void main(String[] args) {
        // Supabase ?몄뒪?몄? ?ы듃
        String host = "aws-1-ap-northeast-2.pooler.supabase.com";
        int port = 6543;
        
        System.out.println("?ㅽ듃?뚰겕 ?뚯폆 ?곌껐 ?뚯뒪???쒖옉: " + host + ":" + port);
        
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(host, port), 5000); // 5珥???꾩븘??            System.out.println("???ㅽ듃?뚰겕 ?곌껐 ?깃났! ?대떦 DB ?쒕쾭濡??묎렐??媛?ν빀?덈떎.");
        } catch (Exception e) {
            System.err.println("???ㅽ듃?뚰겕 ?곌껐 ?ㅽ뙣: " + e.getMessage());
        }
    }
}

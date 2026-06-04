package com.kosmo.vibe;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class DatabaseConnectionTest {

    @Autowired
    private DataSource dataSource;

    @Test
    public void testConnection() {
        assertNotNull(dataSource, "DataSource가 주입되지 않았습니다.");
        
        try (Connection connection = dataSource.getConnection()) {
            assertNotNull(connection, "데이터베이스 Connection을 가져오지 못했습니다.");
            assertTrue(connection.isValid(2), "데이터베이스 연결이 유효하지 않습니다.");
            System.out.println("데이터베이스 연결 성공: " + connection.getMetaData().getURL());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

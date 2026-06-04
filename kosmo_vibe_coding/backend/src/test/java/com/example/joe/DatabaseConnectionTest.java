package com.example.joe;

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
        assertNotNull(dataSource, "DataSource媛 二쇱엯?섏? ?딆븯?듬땲??");
        
        try (Connection connection = dataSource.getConnection()) {
            assertNotNull(connection, "?곗씠?곕쿋?댁뒪 Connection??媛?몄삤吏 紐삵뻽?듬땲??");
            assertTrue(connection.isValid(2), "?곗씠?곕쿋?댁뒪 ?곌껐???좏슚?섏? ?딆뒿?덈떎.");
            System.out.println("?곗씠?곕쿋?댁뒪 ?곌껐 ?깃났: " + connection.getMetaData().getURL());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

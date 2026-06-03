package org.mstc.platform.modules.health.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthController {

    private final JdbcTemplate            jdbcTemplate;
    private final RedisTemplate<String, String> redisTemplate;

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("status",    "UP");
        status.put("timestamp", Instant.now().toString());
        status.put("service",   "mstc-platform");
        status.put("database",  checkDatabase());
        status.put("cache",     checkRedis());
        return ResponseEntity.ok(status);
    }

    private String checkDatabase() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "UP";
        } catch (Exception e) {
            return "DOWN";
        }
    }

    private String checkRedis() {
        try {
            redisTemplate.opsForValue().set("health:ping", "pong");
            return "UP";
        } catch (Exception e) {
            return "DOWN";
        }
    }
}

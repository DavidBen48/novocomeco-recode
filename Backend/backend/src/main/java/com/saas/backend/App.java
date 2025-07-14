package com.saas.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Aplicação principal do Spring Boot
 * Ponto de entrada da aplicação backend
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.saas.backend")
public class App {
    
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
        System.out.println("🚀 Backend do Novo Começo SaaS iniciado com sucesso!");
        System.out.println("📊 API disponível em: http://localhost:8080/api");
        System.out.println("🔗 Supabase conectado: https://aoswpkxmtsyzlpogoepj.supabase.co");
    }
}

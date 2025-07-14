package com.saas.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Modelo de dados para Curso
 * Representa um curso disponível na plataforma
 */
@Entity
@Table(name = "cursos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Título é obrigatório")
    @Size(min = 3, max = 255, message = "Título deve ter entre 3 e 255 caracteres")
    @Column(nullable = false)
    private String titulo;

    @Size(max = 2000, message = "Descrição deve ter no máximo 2000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String descricao;

    @NotBlank(message = "Categoria é obrigatória")
    @Size(max = 100, message = "Categoria deve ter no máximo 100 caracteres")
    @Column(nullable = false)
    private String categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelCurso nivel = NivelCurso.INICIANTE;

    @Min(value = 0, message = "Duração deve ser maior ou igual a 0")
    @Column(nullable = false)
    private Integer duracaoHoras = 0;

    private String imagemUrl;
    private String videoIntroUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCurso status = StatusCurso.ATIVO;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dataAtualizacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instrutor_id")
    private Usuario instrutor;

    @ElementCollection
    @CollectionTable(name = "curso_tags", joinColumns = @JoinColumn(name = "curso_id"))
    @Column(name = "tag")
    private List<String> tags;

    @ElementCollection
    @CollectionTable(name = "curso_requisitos", joinColumns = @JoinColumn(name = "curso_id"))
    @Column(name = "requisito", columnDefinition = "TEXT")
    private List<String> requisitos;

    @ElementCollection
    @CollectionTable(name = "curso_objetivos", joinColumns = @JoinColumn(name = "curso_id"))
    @Column(name = "objetivo", columnDefinition = "TEXT")
    private List<String> objetivos;

    /**
     * Enum para níveis de curso
     */
    public enum NivelCurso {
        INICIANTE,
        INTERMEDIARIO,
        AVANCADO,
        ESPECIALISTA
    }

    /**
     * Enum para status do curso
     */
    public enum StatusCurso {
        ATIVO,
        INATIVO,
        RASCUNHO,
        EM_REVISAO
    }

    /**
     * Construtor para criação de curso
     */
    public Curso(String titulo, String categoria, Usuario instrutor) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.instrutor = instrutor;
    }

    /**
     * Verifica se o curso está ativo
     */
    public boolean isAtivo() {
        return StatusCurso.ATIVO.equals(status);
    }
} 
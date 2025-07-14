package com.saas.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Modelo de dados para Candidatura
 * Representa uma candidatura de um usuário para uma vaga
 */
@Entity
@Table(name = "candidaturas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidatura {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vaga_id", nullable = false)
    private Vaga vaga;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCandidatura status = StatusCandidatura.PENDENTE;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCandidatura;
    
    private LocalDateTime dataAnalise;
    
    @Size(max = 2000, message = "Observações deve ter no máximo 2000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String observacoes;
    
    private String cvUrl;
    
    @Size(max = 2000, message = "Carta de motivação deve ter no máximo 2000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String cartaMotivacao;
    
    /**
     * Enum para status da candidatura
     */
    public enum StatusCandidatura {
        PENDENTE,
        EM_ANALISE,
        APROVADA,
        REJEITADA,
        ENTREVISTA_AGENDADA,
        ENTREVISTA_REALIZADA,
        CONTRATADA,
        DESISTIU
    }
    
    /**
     * Construtor para criação de candidatura
     */
    public Candidatura(Usuario usuario, Vaga vaga) {
        this.usuario = usuario;
        this.vaga = vaga;
    }
    
    /**
     * Verifica se a candidatura está pendente
     */
    public boolean isPendente() {
        return StatusCandidatura.PENDENTE.equals(status);
    }
    
    /**
     * Verifica se a candidatura está em análise
     */
    public boolean isEmAnalise() {
        return StatusCandidatura.EM_ANALISE.equals(status);
    }
    
    /**
     * Verifica se a candidatura foi aprovada
     */
    public boolean isAprovada() {
        return StatusCandidatura.APROVADA.equals(status);
    }
    
    /**
     * Verifica se a candidatura foi rejeitada
     */
    public boolean isRejeitada() {
        return StatusCandidatura.REJEITADA.equals(status);
    }
    
    /**
     * Verifica se a candidatura foi contratada
     */
    public boolean isContratada() {
        return StatusCandidatura.CONTRATADA.equals(status);
    }
    
    /**
     * Verifica se a candidatura pode ser analisada
     */
    public boolean podeSerAnalisada() {
        return isPendente() || isEmAnalise();
    }
    
    /**
     * Marca a candidatura como em análise
     */
    public void marcarComoEmAnalise() {
        this.status = StatusCandidatura.EM_ANALISE;
        this.dataAnalise = LocalDateTime.now();
    }
    
    /**
     * Aprova a candidatura
     */
    public void aprovar(String observacoes) {
        this.status = StatusCandidatura.APROVADA;
        this.dataAnalise = LocalDateTime.now();
        this.observacoes = observacoes;
    }
    
    /**
     * Rejeita a candidatura
     */
    public void rejeitar(String observacoes) {
        this.status = StatusCandidatura.REJEITADA;
        this.dataAnalise = LocalDateTime.now();
        this.observacoes = observacoes;
    }
    
    /**
     * Agenda entrevista
     */
    public void agendarEntrevista() {
        this.status = StatusCandidatura.ENTREVISTA_AGENDADA;
        this.dataAnalise = LocalDateTime.now();
    }
    
    /**
     * Marca entrevista como realizada
     */
    public void entrevistaRealizada() {
        this.status = StatusCandidatura.ENTREVISTA_REALIZADA;
        this.dataAnalise = LocalDateTime.now();
    }
    
    /**
     * Contrata o candidato
     */
    public void contratar() {
        this.status = StatusCandidatura.CONTRATADA;
        this.dataAnalise = LocalDateTime.now();
    }
    
    /**
     * Candidato desiste
     */
    public void desistir() {
        this.status = StatusCandidatura.DESISTIU;
        this.dataAnalise = LocalDateTime.now();
    }
    
    /**
     * Calcula o tempo desde a candidatura
     */
    public long getTempoDesdeCandidatura() {
        return java.time.Duration.between(dataCandidatura, LocalDateTime.now()).toDays();
    }
    
    /**
     * Retorna o status formatado para exibição
     */
    public String getStatusFormatado() {
        switch (status) {
            case PENDENTE:
                return "Pendente";
            case EM_ANALISE:
                return "Em Análise";
            case APROVADA:
                return "Aprovada";
            case REJEITADA:
                return "Rejeitada";
            case ENTREVISTA_AGENDADA:
                return "Entrevista Agendada";
            case ENTREVISTA_REALIZADA:
                return "Entrevista Realizada";
            case CONTRATADA:
                return "Contratada";
            case DESISTIU:
                return "Desistiu";
            default:
                return status.toString();
        }
    }
} 
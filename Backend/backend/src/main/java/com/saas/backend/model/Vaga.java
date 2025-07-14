package com.saas.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Modelo de dados para Vaga
 * Representa uma vaga de emprego disponível na plataforma
 */
@Entity
@Table(name = "vagas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vaga {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotBlank(message = "Título é obrigatório")
    @Size(min = 3, max = 255, message = "Título deve ter entre 3 e 255 caracteres")
    @Column(nullable = false)
    private String titulo;
    
    @NotBlank(message = "Empresa é obrigatória")
    @Size(max = 255, message = "Empresa deve ter no máximo 255 caracteres")
    @Column(nullable = false)
    private String empresa;
    
    @Size(max = 2000, message = "Descrição deve ter no máximo 2000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @ElementCollection
    @CollectionTable(name = "vaga_requisitos", joinColumns = @JoinColumn(name = "vaga_id"))
    @Column(name = "requisito", columnDefinition = "TEXT")
    private List<String> requisitos;
    
    @ElementCollection
    @CollectionTable(name = "vaga_beneficios", joinColumns = @JoinColumn(name = "vaga_id"))
    @Column(name = "beneficio", columnDefinition = "TEXT")
    private List<String> beneficios;
    
    @DecimalMin(value = "0.0", message = "Salário mínimo deve ser maior ou igual a 0")
    @Column(precision = 10, scale = 2)
    private BigDecimal salarioMin;
    
    @DecimalMin(value = "0.0", message = "Salário máximo deve ser maior ou igual a 0")
    @Column(precision = 10, scale = 2)
    private BigDecimal salarioMax;
    
    @Enumerated(EnumType.STRING)
    private TipoContrato tipoContrato;
    
    @Enumerated(EnumType.STRING)
    private ModalidadeTrabalho modalidade;
    
    @Size(max = 255, message = "Localização deve ter no máximo 255 caracteres")
    private String localizacao;
    
    @Enumerated(EnumType.STRING)
    private NivelExperiencia nivelExperiencia;
    
    @Size(max = 100, message = "Área de atuação deve ter no máximo 100 caracteres")
    private String areaAtuacao;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusVaga status = StatusVaga.ATIVA;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataPublicacao;
    
    private LocalDateTime dataEncerramento;
    
    @Email(message = "Email de contato deve ser válido")
    private String contatoEmail;
    
    @Pattern(regexp = "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$", message = "Telefone deve estar no formato (11) 99999-9999")
    private String contatoTelefone;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id")
    private Usuario empresaUsuario;
    
    /**
     * Enum para tipos de contrato
     */
    public enum TipoContrato {
        CLT,
        PJ,
        FREELANCE,
        ESTAGIO,
        TRAINEE,
        TEMPORARIO
    }
    
    /**
     * Enum para modalidades de trabalho
     */
    public enum ModalidadeTrabalho {
        PRESENCIAL,
        REMOTO,
        HIBRIDO
    }
    
    /**
     * Enum para níveis de experiência
     */
    public enum NivelExperiencia {
        JUNIOR,
        PLENO,
        SENIOR,
        ESPECIALISTA,
        COORDENADOR,
        GERENTE,
        DIRETOR
    }
    
    /**
     * Enum para status da vaga
     */
    public enum StatusVaga {
        ATIVA,
        INATIVA,
        ENCERRADA,
        PAUSADA
    }
    
    /**
     * Construtor para criação de vaga
     */
    public Vaga(String titulo, String empresa, Usuario empresaUsuario) {
        this.titulo = titulo;
        this.empresa = empresa;
        this.empresaUsuario = empresaUsuario;
    }
    
    /**
     * Verifica se a vaga está ativa
     */
    public boolean isAtiva() {
        return StatusVaga.ATIVA.equals(status);
    }
    
    /**
     * Verifica se a vaga tem salário definido
     */
    public boolean temSalario() {
        return salarioMin != null || salarioMax != null;
    }
    
    /**
     * Retorna o range salarial formatado
     */
    public String getRangeSalarial() {
        if (!temSalario()) {
            return "A combinar";
        }
        
        if (salarioMin != null && salarioMax != null) {
            return String.format("R$ %.2f - R$ %.2f", salarioMin, salarioMax);
        } else if (salarioMin != null) {
            return String.format("A partir de R$ %.2f", salarioMin);
        } else {
            return String.format("Até R$ %.2f", salarioMax);
        }
    }
    
    /**
     * Verifica se a vaga está encerrada
     */
    public boolean isEncerrada() {
        return StatusVaga.ENCERRADA.equals(status) || 
               (dataEncerramento != null && dataEncerramento.isBefore(LocalDateTime.now()));
    }
    
    /**
     * Calcula o tempo desde a publicação
     */
    public long getTempoDesdePublicacao() {
        return java.time.Duration.between(dataPublicacao, LocalDateTime.now()).toDays();
    }
    
    /**
     * Verifica se a vaga aceita candidaturas
     */
    public boolean aceitaCandidaturas() {
        return isAtiva() && !isEncerrada();
    }
} 
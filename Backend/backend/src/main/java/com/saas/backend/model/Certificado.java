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
 * Modelo de dados para Certificado
 * Representa um certificado emitido para um curso concluído
 */
@Entity
@Table(name = "certificados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certificado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;
    
    @NotBlank(message = "Código de verificação é obrigatório")
    @Size(min = 10, max = 50, message = "Código de verificação deve ter entre 10 e 50 caracteres")
    @Column(unique = true, nullable = false)
    private String codigoVerificacao;
    
    @NotBlank(message = "Título do curso é obrigatório")
    @Size(max = 255, message = "Título do curso deve ter no máximo 255 caracteres")
    @Column(nullable = false)
    private String tituloCurso;
    
    @NotBlank(message = "Nome do aluno é obrigatório")
    @Size(max = 255, message = "Nome do aluno deve ter no máximo 255 caracteres")
    @Column(nullable = false)
    private String nomeAluno;
    
    @NotNull(message = "Data de conclusão é obrigatória")
    @Column(nullable = false)
    private LocalDateTime dataConclusao;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataEmissao;
    
    private String urlCertificado;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCertificado status = StatusCertificado.VALIDO;
    
    /**
     * Enum para status do certificado
     */
    public enum StatusCertificado {
        VALIDO,
        INVALIDO,
        REVOGADO,
        EXPIRADO
    }
    
    /**
     * Construtor para criação de certificado
     */
    public Certificado(Usuario usuario, Curso curso, String codigoVerificacao) {
        this.usuario = usuario;
        this.curso = curso;
        this.codigoVerificacao = codigoVerificacao;
        this.tituloCurso = curso.getTitulo();
        this.nomeAluno = usuario.getNomeCompleto();
        this.dataConclusao = LocalDateTime.now();
    }
    
    /**
     * Verifica se o certificado é válido
     */
    public boolean isValido() {
        return StatusCertificado.VALIDO.equals(status);
    }
    
    /**
     * Gera um código de verificação único
     */
    public static String gerarCodigoVerificacao() {
        return "CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    /**
     * Retorna o código de verificação formatado para exibição
     */
    public String getCodigoFormatado() {
        if (codigoVerificacao == null) return "";
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < codigoVerificacao.length(); i++) {
            if (i > 0 && i % 4 == 0) {
                sb.append("-");
            }
            sb.append(codigoVerificacao.charAt(i));
        }
        return sb.toString();
    }
    
    /**
     * Verifica se o certificado pode ser revogado
     */
    public boolean podeSerRevogado() {
        return isValido() && dataEmissao.plusYears(1).isAfter(LocalDateTime.now());
    }
    
    /**
     * Calcula a idade do certificado em dias
     */
    public long getIdadeEmDias() {
        return java.time.Duration.between(dataEmissao, LocalDateTime.now()).toDays();
    }
} 
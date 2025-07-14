package com.saas.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Modelo de dados para Usuário
 * Representa um usuário do sistema com todas as informações necessárias
 */
@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Column(unique = true, nullable = false)
    private String email;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 255, message = "Nome deve ter entre 2 e 255 caracteres")
    @Column(nullable = false)
    private String nome;
    
    @NotBlank(message = "Sobrenome é obrigatório")
    @Size(min = 2, max = 255, message = "Sobrenome deve ter entre 2 e 255 caracteres")
    @Column(nullable = false)
    private String sobrenome;
    
    @Pattern(regexp = "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$", message = "CPF deve estar no formato 000.000.000-00")
    @Column(unique = true)
    private String cpf;
    
    @Pattern(regexp = "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$", message = "Telefone deve estar no formato (11) 99999-9999")
    private String telefone;
    
    @Past(message = "Data de nascimento deve ser no passado")
    private LocalDate dataNascimento;
    
    @Enumerated(EnumType.STRING)
    private Genero genero;
    
    @Size(max = 1000, message = "Endereço deve ter no máximo 1000 caracteres")
    private String endereco;
    
    @Size(max = 100, message = "Cidade deve ter no máximo 100 caracteres")
    private String cidade;
    
    @Size(min = 2, max = 2, message = "Estado deve ter exatamente 2 caracteres")
    private String estado;
    
    @Pattern(regexp = "^\\d{5}-\\d{3}$", message = "CEP deve estar no formato 00000-000")
    private String cep;
    
    @Size(max = 1000, message = "Bio deve ter no máximo 1000 caracteres")
    private String bio;
    
    private String avatarUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusUsuario status = StatusUsuario.ATIVO;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUsuario tipoUsuario = TipoUsuario.ALUNO;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCriacao;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dataAtualizacao;
    
    private LocalDateTime ultimoLogin;
    
    @Column(nullable = false)
    private Boolean emailVerificado = false;
    
    @Column(nullable = false)
    private Boolean telefoneVerificado = false;
    
    /**
     * Enum para tipos de gênero
     */
    public enum Genero {
        MASCULINO,
        FEMININO,
        NAO_BINARIO,
        PREFERE_NAO_INFORMAR
    }
    
    /**
     * Enum para status do usuário
     */
    public enum StatusUsuario {
        ATIVO,
        INATIVO,
        BLOQUEADO,
        PENDENTE
    }
    
    /**
     * Enum para tipos de usuário
     */
    public enum TipoUsuario {
        ALUNO,
        INSTRUTOR,
        ADMIN,
        EMPRESA
    }
    
    /**
     * Construtor para criação de usuário
     */
    public Usuario(String email, String nome, String sobrenome) {
        this.email = email;
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
    
    /**
     * Retorna o nome completo do usuário
     */
    public String getNomeCompleto() {
        return nome + " " + sobrenome;
    }
    
    /**
     * Verifica se o usuário é um instrutor
     */
    public boolean isInstrutor() {
        return TipoUsuario.INSTRUTOR.equals(tipoUsuario);
    }
    
    /**
     * Verifica se o usuário é um administrador
     */
    public boolean isAdmin() {
        return TipoUsuario.ADMIN.equals(tipoUsuario);
    }
    
    /**
     * Verifica se o usuário é uma empresa
     */
    public boolean isEmpresa() {
        return TipoUsuario.EMPRESA.equals(tipoUsuario);
    }
    
    /**
     * Verifica se o usuário está ativo
     */
    public boolean isAtivo() {
        return StatusUsuario.ATIVO.equals(status);
    }
} 
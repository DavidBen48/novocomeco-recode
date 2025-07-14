package com.saas.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

/**
 * Serviço de validação para campos específicos do sistema
 * Implementa validações customizadas além das anotações JPA
 */
@Service
public class ValidacaoService {
    
    // Padrões de regex para validação
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    
    private static final Pattern CPF_PATTERN = Pattern.compile(
        "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$"
    );
    
    private static final Pattern TELEFONE_PATTERN = Pattern.compile(
        "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$"
    );
    
    private static final Pattern CEP_PATTERN = Pattern.compile(
        "^\\d{5}-\\d{3}$"
    );
    
    /**
     * Valida formato de email
     */
    public boolean isEmailValido(String email) {
        if (!StringUtils.hasText(email)) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }
    
    /**
     * Valida CPF (formato e dígitos verificadores)
     */
    public boolean isCPFValido(String cpf) {
        if (!StringUtils.hasText(cpf)) {
            return false;
        }
        
        // Verificar formato
        if (!CPF_PATTERN.matcher(cpf).matches()) {
            return false;
        }
        
        // Remover pontos e traços
        String cleanCPF = cpf.replaceAll("[^\\d]", "");
        
        // Verificar se tem 11 dígitos
        if (cleanCPF.length() != 11) {
            return false;
        }
        
        // Verificar se todos os dígitos são iguais
        if (cleanCPF.matches("(\\d)\\1{10}")) {
            return false;
        }
        
        // Validar primeiro dígito verificador
        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += Character.getNumericValue(cleanCPF.charAt(i)) * (10 - i);
        }
        int remainder = 11 - (sum % 11);
        if (remainder == 10 || remainder == 11) {
            remainder = 0;
        }
        if (remainder != Character.getNumericValue(cleanCPF.charAt(9))) {
            return false;
        }
        
        // Validar segundo dígito verificador
        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += Character.getNumericValue(cleanCPF.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        if (remainder == 10 || remainder == 11) {
            remainder = 0;
        }
        if (remainder != Character.getNumericValue(cleanCPF.charAt(10))) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Valida formato de telefone
     */
    public boolean isTelefoneValido(String telefone) {
        if (!StringUtils.hasText(telefone)) {
            return false;
        }
        return TELEFONE_PATTERN.matcher(telefone).matches();
    }
    
    /**
     * Valida formato de CEP
     */
    public boolean isCEPValido(String cep) {
        if (!StringUtils.hasText(cep)) {
            return false;
        }
        return CEP_PATTERN.matcher(cep).matches();
    }
    
    /**
     * Valida senha (força mínima)
     */
    public boolean isSenhaValida(String senha) {
        if (!StringUtils.hasText(senha)) {
            return false;
        }
        
        // Mínimo 6 caracteres
        if (senha.length() < 6) {
            return false;
        }
        
        // Pelo menos uma letra e um número
        boolean temLetra = senha.matches(".*[a-zA-Z].*");
        boolean temNumero = senha.matches(".*\\d.*");
        
        return temLetra && temNumero;
    }
    
    /**
     * Valida nome (apenas letras, espaços e acentos)
     */
    public boolean isNomeValido(String nome) {
        if (!StringUtils.hasText(nome)) {
            return false;
        }
        
        // Apenas letras, espaços e acentos
        return nome.matches("^[\\p{L}\\s]+$") && nome.length() >= 2;
    }
    
    /**
     * Valida data de nascimento (idade mínima 16 anos)
     */
    public boolean isDataNascimentoValida(java.time.LocalDate dataNascimento) {
        if (dataNascimento == null) {
            return false;
        }
        
        java.time.LocalDate hoje = java.time.LocalDate.now();
        java.time.Period idade = java.time.Period.between(dataNascimento, hoje);
        
        return idade.getYears() >= 16 && idade.getYears() <= 120;
    }
    
    /**
     * Valida estado (sigla válida)
     */
    public boolean isEstadoValido(String estado) {
        if (!StringUtils.hasText(estado)) {
            return false;
        }
        
        String[] estadosValidos = {
            "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
            "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
            "RS", "RO", "RR", "SC", "SP", "SE", "TO"
        };
        
        for (String estadoValido : estadosValidos) {
            if (estadoValido.equals(estado)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Formata CPF para exibição
     */
    public String formatarCPF(String cpf) {
        if (!StringUtils.hasText(cpf)) {
            return "";
        }
        
        String cleanCPF = cpf.replaceAll("[^\\d]", "");
        if (cleanCPF.length() != 11) {
            return cpf;
        }
        
        return String.format("%s.%s.%s-%s",
            cleanCPF.substring(0, 3),
            cleanCPF.substring(3, 6),
            cleanCPF.substring(6, 9),
            cleanCPF.substring(9, 11)
        );
    }
    
    /**
     * Formata telefone para exibição
     */
    public String formatarTelefone(String telefone) {
        if (!StringUtils.hasText(telefone)) {
            return "";
        }
        
        String cleanTelefone = telefone.replaceAll("[^\\d]", "");
        if (cleanTelefone.length() != 10 && cleanTelefone.length() != 11) {
            return telefone;
        }
        
        if (cleanTelefone.length() == 10) {
            return String.format("(%s) %s-%s",
                cleanTelefone.substring(0, 2),
                cleanTelefone.substring(2, 6),
                cleanTelefone.substring(6, 10)
            );
        } else {
            return String.format("(%s) %s-%s",
                cleanTelefone.substring(0, 2),
                cleanTelefone.substring(2, 7),
                cleanTelefone.substring(7, 11)
            );
        }
    }
    
    /**
     * Formata CEP para exibição
     */
    public String formatarCEP(String cep) {
        if (!StringUtils.hasText(cep)) {
            return "";
        }
        
        String cleanCEP = cep.replaceAll("[^\\d]", "");
        if (cleanCEP.length() != 8) {
            return cep;
        }
        
        return String.format("%s-%s",
            cleanCEP.substring(0, 5),
            cleanCEP.substring(5, 8)
        );
    }
    
    /**
     * Gera mensagem de erro para validação de senha
     */
    public String getMensagemErroSenha(String senha) {
        if (!StringUtils.hasText(senha)) {
            return "Senha é obrigatória";
        }
        
        if (senha.length() < 6) {
            return "Senha deve ter pelo menos 6 caracteres";
        }
        
        if (!senha.matches(".*[a-zA-Z].*")) {
            return "Senha deve conter pelo menos uma letra";
        }
        
        if (!senha.matches(".*\\d.*")) {
            return "Senha deve conter pelo menos um número";
        }
        
        return null;
    }
} 
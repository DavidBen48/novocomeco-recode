package com.saas.backend.service;

import com.saas.backend.model.Usuario;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Serviço para gerenciamento de usuários
 * Integra com Supabase e implementa validações de negócio
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {
    
    @Value("${supabase.url}")
    private String supabaseUrl;
    
    @Value("${supabase.anon-key}")
    private String supabaseAnonKey;
    
    private final ValidacaoService validacaoService;
    
    /**
     * Cria um novo usuário
     */
    public Usuario criarUsuario(Usuario usuario) {
        log.info("Criando usuário: {}", usuario.getEmail());
        
        // Validações de negócio
        validarDadosUsuario(usuario);
        
        // Verificar se email já existe
        if (buscarUsuarioPorEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Verificar se CPF já existe (se fornecido)
        if (usuario.getCpf() != null && buscarUsuarioPorCPF(usuario.getCpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }
        
        // Definir valores padrão
        if (usuario.getStatus() == null) {
            usuario.setStatus(Usuario.StatusUsuario.ATIVO);
        }
        
        if (usuario.getTipoUsuario() == null) {
            usuario.setTipoUsuario(Usuario.TipoUsuario.ALUNO);
        }
        
        if (usuario.getEmailVerificado() == null) {
            usuario.setEmailVerificado(false);
        }
        
        if (usuario.getTelefoneVerificado() == null) {
            usuario.setTelefoneVerificado(false);
        }
        
        // Salvar no Supabase
        try {
            // Aqui você implementaria a integração com Supabase
            // Por enquanto, simulamos o salvamento
            usuario.setId(UUID.randomUUID());
            usuario.setDataCriacao(LocalDateTime.now());
            usuario.setDataAtualizacao(LocalDateTime.now());
            
            log.info("Usuário criado com sucesso: {}", usuario.getId());
            return usuario;
        } catch (Exception e) {
            log.error("Erro ao criar usuário: {}", e.getMessage());
            throw new RuntimeException("Erro ao criar usuário", e);
        }
    }
    
    /**
     * Busca usuário por ID
     */
    public Optional<Usuario> buscarUsuarioPorId(UUID id) {
        log.info("Buscando usuário por ID: {}", id);
        
        try {
            // Aqui você implementaria a busca no Supabase
            // Por enquanto, retornamos null
            return Optional.empty();
        } catch (Exception e) {
            log.error("Erro ao buscar usuário por ID: {}", e.getMessage());
            throw new RuntimeException("Erro ao buscar usuário", e);
        }
    }
    
    /**
     * Busca usuário por email
     */
    public Optional<Usuario> buscarUsuarioPorEmail(String email) {
        log.info("Buscando usuário por email: {}", email);
        
        if (!validacaoService.isEmailValido(email)) {
            throw new RuntimeException("Email inválido");
        }
        
        try {
            // Aqui você implementaria a busca no Supabase
            // Por enquanto, retornamos null
            return Optional.empty();
        } catch (Exception e) {
            log.error("Erro ao buscar usuário por email: {}", e.getMessage());
            throw new RuntimeException("Erro ao buscar usuário", e);
        }
    }
    
    /**
     * Busca usuário por CPF
     */
    public Optional<Usuario> buscarUsuarioPorCPF(String cpf) {
        log.info("Buscando usuário por CPF: {}", cpf);
        
        if (!validacaoService.isCPFValido(cpf)) {
            throw new RuntimeException("CPF inválido");
        }
        
        try {
            // Aqui você implementaria a busca no Supabase
            // Por enquanto, retornamos null
            return Optional.empty();
        } catch (Exception e) {
            log.error("Erro ao buscar usuário por CPF: {}", e.getMessage());
            throw new RuntimeException("Erro ao buscar usuário", e);
        }
    }
    
    /**
     * Lista todos os usuários
     */
    public List<Usuario> listarTodosUsuarios() {
        log.info("Listando todos os usuários");
        
        try {
            // Aqui você implementaria a listagem no Supabase
            // Por enquanto, retornamos lista vazia
            return List.of();
        } catch (Exception e) {
            log.error("Erro ao listar usuários: {}", e.getMessage());
            throw new RuntimeException("Erro ao listar usuários", e);
        }
    }
    
    /**
     * Atualiza um usuário
     */
    public Usuario atualizarUsuario(UUID id, Usuario usuarioAtualizado) {
        log.info("Atualizando usuário: {}", id);
        
        Optional<Usuario> usuarioExistente = buscarUsuarioPorId(id);
        if (usuarioExistente.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        Usuario usuario = usuarioExistente.get();
        
        // Validações de negócio
        validarDadosUsuario(usuarioAtualizado);
        
        // Verificar se email já existe (se foi alterado)
        if (usuarioAtualizado.getEmail() != null && 
            !usuarioAtualizado.getEmail().equals(usuario.getEmail())) {
            if (buscarUsuarioPorEmail(usuarioAtualizado.getEmail()).isPresent()) {
                throw new RuntimeException("Email já cadastrado");
            }
        }
        
        // Verificar se CPF já existe (se foi alterado)
        if (usuarioAtualizado.getCpf() != null && 
            !usuarioAtualizado.getCpf().equals(usuario.getCpf())) {
            if (buscarUsuarioPorCPF(usuarioAtualizado.getCpf()).isPresent()) {
                throw new RuntimeException("CPF já cadastrado");
            }
        }
        
        // Atualizar campos
        if (usuarioAtualizado.getNome() != null) {
            usuario.setNome(usuarioAtualizado.getNome());
        }
        
        if (usuarioAtualizado.getSobrenome() != null) {
            usuario.setSobrenome(usuarioAtualizado.getSobrenome());
        }
        
        if (usuarioAtualizado.getEmail() != null) {
            usuario.setEmail(usuarioAtualizado.getEmail());
        }
        
        if (usuarioAtualizado.getCpf() != null) {
            usuario.setCpf(usuarioAtualizado.getCpf());
        }
        
        if (usuarioAtualizado.getTelefone() != null) {
            usuario.setTelefone(usuarioAtualizado.getTelefone());
        }
        
        if (usuarioAtualizado.getDataNascimento() != null) {
            usuario.setDataNascimento(usuarioAtualizado.getDataNascimento());
        }
        
        if (usuarioAtualizado.getGenero() != null) {
            usuario.setGenero(usuarioAtualizado.getGenero());
        }
        
        if (usuarioAtualizado.getEndereco() != null) {
            usuario.setEndereco(usuarioAtualizado.getEndereco());
        }
        
        if (usuarioAtualizado.getCidade() != null) {
            usuario.setCidade(usuarioAtualizado.getCidade());
        }
        
        if (usuarioAtualizado.getEstado() != null) {
            usuario.setEstado(usuarioAtualizado.getEstado());
        }
        
        if (usuarioAtualizado.getCep() != null) {
            usuario.setCep(usuarioAtualizado.getCep());
        }
        
        if (usuarioAtualizado.getBio() != null) {
            usuario.setBio(usuarioAtualizado.getBio());
        }
        
        if (usuarioAtualizado.getAvatarUrl() != null) {
            usuario.setAvatarUrl(usuarioAtualizado.getAvatarUrl());
        }
        
        if (usuarioAtualizado.getStatus() != null) {
            usuario.setStatus(usuarioAtualizado.getStatus());
        }
        
        if (usuarioAtualizado.getTipoUsuario() != null) {
            usuario.setTipoUsuario(usuarioAtualizado.getTipoUsuario());
        }
        
        if (usuarioAtualizado.getEmailVerificado() != null) {
            usuario.setEmailVerificado(usuarioAtualizado.getEmailVerificado());
        }
        
        if (usuarioAtualizado.getTelefoneVerificado() != null) {
            usuario.setTelefoneVerificado(usuarioAtualizado.getTelefoneVerificado());
        }
        
        // Atualizar data de atualização
        usuario.setDataAtualizacao(LocalDateTime.now());
        
        try {
            // Aqui você implementaria a atualização no Supabase
            log.info("Usuário atualizado com sucesso: {}", id);
            return usuario;
        } catch (Exception e) {
            log.error("Erro ao atualizar usuário: {}", e.getMessage());
            throw new RuntimeException("Erro ao atualizar usuário", e);
        }
    }
    
    /**
     * Deleta um usuário
     */
    public boolean deletarUsuario(UUID id) {
        log.info("Deletando usuário: {}", id);
        
        Optional<Usuario> usuario = buscarUsuarioPorId(id);
        if (usuario.isEmpty()) {
            return false;
        }
        
        try {
            // Aqui você implementaria a deleção no Supabase
            log.info("Usuário deletado com sucesso: {}", id);
            return true;
        } catch (Exception e) {
            log.error("Erro ao deletar usuário: {}", e.getMessage());
            throw new RuntimeException("Erro ao deletar usuário", e);
        }
    }
    
    /**
     * Busca usuários por tipo
     */
    public List<Usuario> buscarUsuariosPorTipo(String tipo) {
        log.info("Buscando usuários por tipo: {}", tipo);
        
        try {
            // Aqui você implementaria a busca no Supabase
            // Por enquanto, retornamos lista vazia
            return List.of();
        } catch (Exception e) {
            log.error("Erro ao buscar usuários por tipo: {}", e.getMessage());
            throw new RuntimeException("Erro ao buscar usuários", e);
        }
    }
    
    /**
     * Busca usuários ativos
     */
    public List<Usuario> buscarUsuariosAtivos() {
        log.info("Buscando usuários ativos");
        
        try {
            // Aqui você implementaria a busca no Supabase
            // Por enquanto, retornamos lista vazia
            return List.of();
        } catch (Exception e) {
            log.error("Erro ao buscar usuários ativos: {}", e.getMessage());
            throw new RuntimeException("Erro ao buscar usuários ativos", e);
        }
    }
    
    /**
     * Verifica se usuário existe
     */
    public boolean usuarioExiste(UUID id) {
        return buscarUsuarioPorId(id).isPresent();
    }
    
    /**
     * Verifica se email existe
     */
    public boolean emailExiste(String email) {
        return buscarUsuarioPorEmail(email).isPresent();
    }
    
    /**
     * Verifica se CPF existe
     */
    public boolean cpfExiste(String cpf) {
        return buscarUsuarioPorCPF(cpf).isPresent();
    }
    
    /**
     * Atualiza último login
     */
    public void atualizarUltimoLogin(UUID id) {
        log.info("Atualizando último login para usuário: {}", id);
        
        Optional<Usuario> usuario = buscarUsuarioPorId(id);
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            u.setUltimoLogin(LocalDateTime.now());
            u.setDataAtualizacao(LocalDateTime.now());
            
            try {
                // Aqui você implementaria a atualização no Supabase
                log.info("Último login atualizado para usuário: {}", id);
            } catch (Exception e) {
                log.error("Erro ao atualizar último login: {}", e.getMessage());
            }
        }
    }
    
    /**
     * Valida dados do usuário
     */
    private void validarDadosUsuario(Usuario usuario) {
        if (usuario.getEmail() != null && !validacaoService.isEmailValido(usuario.getEmail())) {
            throw new RuntimeException("Email inválido");
        }
        
        if (usuario.getCpf() != null && !validacaoService.isCPFValido(usuario.getCpf())) {
            throw new RuntimeException("CPF inválido");
        }
        
        if (usuario.getTelefone() != null && !validacaoService.isTelefoneValido(usuario.getTelefone())) {
            throw new RuntimeException("Telefone inválido");
        }
        
        if (usuario.getCep() != null && !validacaoService.isCEPValido(usuario.getCep())) {
            throw new RuntimeException("CEP inválido");
        }
        
        if (usuario.getEstado() != null && !validacaoService.isEstadoValido(usuario.getEstado())) {
            throw new RuntimeException("Estado inválido");
        }
        
        if (usuario.getDataNascimento() != null && !validacaoService.isDataNascimentoValida(usuario.getDataNascimento())) {
            throw new RuntimeException("Data de nascimento inválida (idade mínima 16 anos)");
        }
        
        if (usuario.getNome() != null && !validacaoService.isNomeValido(usuario.getNome())) {
            throw new RuntimeException("Nome inválido");
        }
        
        if (usuario.getSobrenome() != null && !validacaoService.isNomeValido(usuario.getSobrenome())) {
            throw new RuntimeException("Sobrenome inválido");
        }
    }
} 
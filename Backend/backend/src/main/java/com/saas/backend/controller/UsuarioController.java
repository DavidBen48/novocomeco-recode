package com.saas.backend.controller;

import com.saas.backend.model.Usuario;
import com.saas.backend.service.UsuarioService;
import com.saas.backend.service.ValidacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Controller para gerenciamento de usuários
 * Responsável por operações CRUD e validações de usuários
 */
@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://novocomeco-saas.vercel.app"})
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    private final ValidacaoService validacaoService;
    
    /**
     * Cria um novo usuário
     */
    @PostMapping
    public ResponseEntity<?> criarUsuario(@Valid @RequestBody Usuario usuario, BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        
        // Validações customizadas
        if (result.hasErrors()) {
            response.put("success", false);
            response.put("message", "Dados inválidos");
            response.put("errors", result.getFieldErrors());
            return ResponseEntity.badRequest().body(response);
        }
        
        // Validações adicionais
        if (!validacaoService.isEmailValido(usuario.getEmail())) {
            response.put("success", false);
            response.put("message", "Email inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (usuario.getCpf() != null && !validacaoService.isCPFValido(usuario.getCpf())) {
            response.put("success", false);
            response.put("message", "CPF inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (usuario.getTelefone() != null && !validacaoService.isTelefoneValido(usuario.getTelefone())) {
            response.put("success", false);
            response.put("message", "Telefone inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (usuario.getCep() != null && !validacaoService.isCEPValido(usuario.getCep())) {
            response.put("success", false);
            response.put("message", "CEP inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (usuario.getEstado() != null && !validacaoService.isEstadoValido(usuario.getEstado())) {
            response.put("success", false);
            response.put("message", "Estado inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (usuario.getDataNascimento() != null && !validacaoService.isDataNascimentoValida(usuario.getDataNascimento())) {
            response.put("success", false);
            response.put("message", "Data de nascimento inválida (idade mínima 16 anos)");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
            response.put("success", true);
            response.put("message", "Usuário criado com sucesso");
            response.put("data", usuarioCriado);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao criar usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Busca um usuário por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuarioPorId(@PathVariable UUID id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Usuario usuario = usuarioService.buscarUsuarioPorId(id);
            if (usuario != null) {
                response.put("success", true);
                response.put("data", usuario);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Usuário não encontrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Busca um usuário por email
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<?> buscarUsuarioPorEmail(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();
        
        if (!validacaoService.isEmailValido(email)) {
            response.put("success", false);
            response.put("message", "Email inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Usuario usuario = usuarioService.buscarUsuarioPorEmail(email);
            if (usuario != null) {
                response.put("success", true);
                response.put("data", usuario);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Usuário não encontrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Lista todos os usuários
     */
    @GetMapping
    public ResponseEntity<?> listarUsuarios() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Usuario> usuarios = usuarioService.listarTodosUsuarios();
            response.put("success", true);
            response.put("data", usuarios);
            response.put("total", usuarios.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao listar usuários: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Atualiza um usuário
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable UUID id, @Valid @RequestBody Usuario usuario, BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        
        if (result.hasErrors()) {
            response.put("success", false);
            response.put("message", "Dados inválidos");
            response.put("errors", result.getFieldErrors());
            return ResponseEntity.badRequest().body(response);
        }
        
        // Validações adicionais
        if (usuario.getEmail() != null && !validacaoService.isEmailValido(usuario.getEmail())) {
            response.put("success", false);
            response.put("message", "Email inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (usuario.getCpf() != null && !validacaoService.isCPFValido(usuario.getCpf())) {
            response.put("success", false);
            response.put("message", "CPF inválido");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Usuario usuarioAtualizado = usuarioService.atualizarUsuario(id, usuario);
            if (usuarioAtualizado != null) {
                response.put("success", true);
                response.put("message", "Usuário atualizado com sucesso");
                response.put("data", usuarioAtualizado);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Usuário não encontrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao atualizar usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Deleta um usuário
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable UUID id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean deletado = usuarioService.deletarUsuario(id);
            if (deletado) {
                response.put("success", true);
                response.put("message", "Usuário deletado com sucesso");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Usuário não encontrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao deletar usuário: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Valida CPF
     */
    @PostMapping("/validar-cpf")
    public ResponseEntity<?> validarCPF(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String cpf = request.get("cpf");
        
        if (cpf == null) {
            response.put("success", false);
            response.put("message", "CPF é obrigatório");
            return ResponseEntity.badRequest().body(response);
        }
        
        boolean isValid = validacaoService.isCPFValido(cpf);
        response.put("success", true);
        response.put("valid", isValid);
        response.put("formatted", validacaoService.formatarCPF(cpf));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Valida email
     */
    @PostMapping("/validar-email")
    public ResponseEntity<?> validarEmail(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String email = request.get("email");
        
        if (email == null) {
            response.put("success", false);
            response.put("message", "Email é obrigatório");
            return ResponseEntity.badRequest().body(response);
        }
        
        boolean isValid = validacaoService.isEmailValido(email);
        response.put("success", true);
        response.put("valid", isValid);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Valida telefone
     */
    @PostMapping("/validar-telefone")
    public ResponseEntity<?> validarTelefone(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String telefone = request.get("telefone");
        
        if (telefone == null) {
            response.put("success", false);
            response.put("message", "Telefone é obrigatório");
            return ResponseEntity.badRequest().body(response);
        }
        
        boolean isValid = validacaoService.isTelefoneValido(telefone);
        response.put("success", true);
        response.put("valid", isValid);
        response.put("formatted", validacaoService.formatarTelefone(telefone));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Busca usuários por tipo
     */
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<?> buscarUsuariosPorTipo(@PathVariable String tipo) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Usuario> usuarios = usuarioService.buscarUsuariosPorTipo(tipo);
            response.put("success", true);
            response.put("data", usuarios);
            response.put("total", usuarios.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar usuários: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Busca usuários ativos
     */
    @GetMapping("/ativos")
    public ResponseEntity<?> buscarUsuariosAtivos() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Usuario> usuarios = usuarioService.buscarUsuariosAtivos();
            response.put("success", true);
            response.put("data", usuarios);
            response.put("total", usuarios.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao buscar usuários ativos: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
} 
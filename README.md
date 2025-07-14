# Novo Começo SaaS - Plataforma de Cursos e Vagas

Uma plataforma completa para cursos online e vagas de emprego, desenvolvida com Next.js, Spring Boot e Supabase.

## 🚀 Funcionalidades

### Autenticação e Usuários
- ✅ Cadastro e login com validação completa
- ✅ Perfil de usuário com dados pessoais
- ✅ Validação de CPF, email, telefone e CEP
- ✅ Diferentes tipos de usuário (Aluno, Instrutor, Empresa, Admin)

### Cursos
- ✅ Sistema completo de cursos com módulos e aulas
- ✅ Progresso individual dos alunos
- ✅ Certificados automáticos ao concluir cursos
- ✅ Avaliações e comentários

### Vagas de Emprego
- ✅ Publicação de vagas por empresas
- ✅ Sistema de candidaturas
- ✅ Acompanhamento de status das candidaturas
- ✅ Filtros por localização, modalidade e experiência

### Certificados
- ✅ Geração automática de certificados
- ✅ Código único de verificação
- ✅ Validação pública de certificados
- ✅ Prevenção de duplicação

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones

### Backend
- **Spring Boot 3.2.6** - Framework Java
- **Spring Security** - Segurança
- **Spring Data JPA** - Persistência
- **PostgreSQL** - Banco de dados (via Supabase)
- **JWT** - Autenticação
- **Lombok** - Redução de boilerplate

### Banco de Dados
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Banco de dados
- **Row Level Security (RLS)** - Segurança
- **Triggers** - Automação de certificados

## 📋 Pré-requisitos

- Node.js 18+       (obrigatório)
- Java 17+          (obrigatório)
- Maven 3.8+        (obrigatório)
- Conta no Supabase (não obrigatório)

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/novocomeco-saas.git
cd novocomeco-saas
```

s### 2. Configuração do Supabase

1. Acesse o [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Execute o SQL do arquivo `database_schema.sql` no SQL Editor
4. Copie as credenciais do projeto

### 3. Configuração do Frontend

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 4. Configuração do Backend

```bash
cd Backend/backend

# Compilar o projeto
mvn clean install

# Configurar application.properties
```

Edite `src/main/resources/application.properties`:
```properties
supabase.url=sua_url_do_supabase
supabase.anon-key=sua_chave_anonima
```

## 🏃‍♂️ Executando o Projeto

### Frontend
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

### Backend
```bash
cd Backend/backend

# Desenvolvimento
mvn spring-boot:run

# Produção
mvn clean package
java -jar target/backend-1.0-SNAPSHOT.jar
```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### `usuarios`
- Dados pessoais dos usuários
- Tipos: ALUNO, INSTRUTOR, EMPRESA, ADMIN
- Validações de CPF, email, telefone

#### `cursos`
- Informações dos cursos
- Relacionamento com instrutores
- Tags, requisitos e objetivos

#### `modulos` e `aulas`
- Estrutura hierárquica dos cursos
- Ordem e duração das aulas

#### `inscricoes_cursos`
- Relacionamento usuário-curso
- Progresso e status de conclusão

#### `progresso_aulas`
- Progresso individual por aula
- Tempo assistido e conclusão

#### `certificados`
- Certificados emitidos automaticamente
- Código único de verificação
- Prevenção de duplicação

#### `vagas`
- Vagas de emprego publicadas
- Informações salariais e requisitos

#### `candidaturas`
- Candidaturas dos usuários
- Status e observações

## 🔐 Segurança

### Frontend
- Validação em tempo real
- Contexto de autenticação
- Proteção de rotas

### Backend
- Validação completa de dados
- Spring Security
- CORS configurado
- JWT para autenticação

### Banco de Dados
- Row Level Security (RLS)
- Políticas de acesso
- Triggers para automação
- Validações de integridade

## 🧪 Validações Implementadas

### Frontend
- ✅ Email válido
- ✅ Senha forte (mínimo 6 caracteres)
- ✅ CPF válido
- ✅ Telefone no formato (11) 99999-9999
- ✅ CEP no formato 00000-000
- ✅ Data de nascimento (idade mínima 16 anos)
- ✅ Estados brasileiros válidos

### Backend
- ✅ Validações JPA (@Valid, @NotNull, etc.)
- ✅ Validações customizadas (CPF, telefone, etc.)
- ✅ Verificação de duplicatas
- ✅ Validação de negócio

## 📱 Funcionalidades por Tipo de Usuário

### Aluno
- ✅ Visualizar e se inscrever em cursos
- ✅ Acompanhar progresso
- ✅ Receber certificados
- ✅ Candidatar-se a vagas
- ✅ Avaliar cursos

### Instrutor
- ✅ Criar e gerenciar cursos
- ✅ Visualizar progresso dos alunos
- ✅ Emitir certificados

### Empresa
- ✅ Publicar vagas de emprego
- ✅ Gerenciar candidaturas
- ✅ Visualizar candidatos

### Admin
- ✅ Gerenciar todos os usuários
- ✅ Moderar conteúdo
- ✅ Relatórios e estatísticas

## 🔄 Fluxo de Certificados

1. **Inscrição**: Usuário se inscreve em um curso
2. **Progresso**: Sistema registra progresso por aula
3. **Conclusão**: Quando todas as aulas são concluídas
4. **Trigger**: Banco gera certificado automaticamente
5. **Validação**: Código único permite verificação pública

## 🎯 Próximos Passos -> adicionados nas próximas versões

- [ ] Implementar paginação
- [ ] Adicionar testes unitários
- [ ] Implementar upload de arquivos
- [ ] Adicionar notificações
- [ ] Implementar chat entre usuários
- [ ] Adicionar relatórios avançados
- [ ] Implementar sistema de pagamentos
- [ ] Adicionar gamificação

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: davidbensaxofonista@gmail.com
- Whatsapp: +55 21 994808526

---

**Desenvolvido com ❤️ para transformar carreiras e conectar talentos às melhores oportunidades.** 
-- =====================================================
-- ESTRUTURA DO BANCO DE DADOS - NOVO COMEÇO SAAS
-- =====================================================

-- Tabela de Usuários (extensão da auth.users do Supabase)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    data_nascimento DATE,
    genero VARCHAR(20),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    bio TEXT,
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'ativo',
    tipo_usuario VARCHAR(20) DEFAULT 'aluno',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultimo_login TIMESTAMP WITH TIME ZONE,
    email_verificado BOOLEAN DEFAULT FALSE,
    telefone_verificado BOOLEAN DEFAULT FALSE
);

-- Tabela de Cursos
CREATE TABLE IF NOT EXISTS public.cursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) DEFAULT 'iniciante',
    duracao_horas INTEGER DEFAULT 0,
    imagem_url TEXT,
    video_intro_url TEXT,
    status VARCHAR(20) DEFAULT 'ativo',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    instrutor_id UUID REFERENCES public.usuarios(id),
    tags TEXT[],
    requisitos TEXT[],
    objetivos TEXT[]
);

-- Tabela de Módulos dos Cursos
CREATE TABLE IF NOT EXISTS public.modulos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curso_id UUID NOT NULL REFERENCES public.cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ordem INTEGER NOT NULL,
    duracao_minutos INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ativo',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Aulas
CREATE TABLE IF NOT EXISTS public.aulas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    modulo_id UUID NOT NULL REFERENCES public.modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) DEFAULT 'video', -- video, texto, quiz, etc.
    conteudo TEXT,
    video_url TEXT,
    duracao_minutos INTEGER DEFAULT 0,
    ordem INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Inscrições em Cursos
CREATE TABLE IF NOT EXISTS public.inscricoes_cursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    curso_id UUID NOT NULL REFERENCES public.cursos(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'em_andamento', -- em_andamento, concluido, cancelado
    progresso_percentual INTEGER DEFAULT 0,
    data_inscricao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_conclusao TIMESTAMP WITH TIME ZONE,
    data_cancelamento TIMESTAMP WITH TIME ZONE,
    UNIQUE(usuario_id, curso_id)
);

-- Tabela de Progresso das Aulas
CREATE TABLE IF NOT EXISTS public.progresso_aulas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    aula_id UUID NOT NULL REFERENCES public.aulas(id) ON DELETE CASCADE,
    concluida BOOLEAN DEFAULT FALSE,
    tempo_assistido INTEGER DEFAULT 0, -- em segundos
    data_conclusao TIMESTAMP WITH TIME ZONE,
    data_ultimo_acesso TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(usuario_id, aula_id)
);

-- Tabela de Certificados
CREATE TABLE IF NOT EXISTS public.certificados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    curso_id UUID NOT NULL REFERENCES public.cursos(id) ON DELETE CASCADE,
    codigo_verificacao VARCHAR(50) UNIQUE NOT NULL,
    titulo_curso VARCHAR(255) NOT NULL,
    nome_aluno VARCHAR(255) NOT NULL,
    data_conclusao TIMESTAMP WITH TIME ZONE NOT NULL,
    data_emissao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    url_certificado TEXT,
    status VARCHAR(20) DEFAULT 'valido',
    UNIQUE(usuario_id, curso_id) -- Garante apenas um certificado por curso
);

-- Tabela de Vagas de Emprego
CREATE TABLE IF NOT EXISTS public.vagas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    descricao TEXT,
    requisitos TEXT[],
    beneficios TEXT[],
    salario_min DECIMAL(10,2),
    salario_max DECIMAL(10,2),
    tipo_contrato VARCHAR(50), -- CLT, PJ, Freelance, etc.
    modalidade VARCHAR(50), -- presencial, remoto, hibrido
    localizacao VARCHAR(255),
    nivel_experiencia VARCHAR(50),
    area_atuacao VARCHAR(100),
    status VARCHAR(20) DEFAULT 'ativa',
    data_publicacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_encerramento TIMESTAMP WITH TIME ZONE,
    contato_email VARCHAR(255),
    contato_telefone VARCHAR(20),
    empresa_id UUID REFERENCES public.usuarios(id)
);

-- Tabela de Candidaturas
CREATE TABLE IF NOT EXISTS public.candidaturas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    vaga_id UUID NOT NULL REFERENCES public.vagas(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pendente', -- pendente, em_analise, aprovada, rejeitada
    data_candidatura TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_analise TIMESTAMP WITH TIME ZONE,
    observacoes TEXT,
    cv_url TEXT,
    carta_motivacao TEXT,
    UNIQUE(usuario_id, vaga_id)
);

-- Tabela de Avaliações de Cursos
CREATE TABLE IF NOT EXISTS public.avaliacoes_cursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    curso_id UUID NOT NULL REFERENCES public.cursos(id) ON DELETE CASCADE,
    nota INTEGER CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(usuario_id, curso_id)
);

-- Tabela de Sessões de Usuário
CREATE TABLE IF NOT EXISTS public.sessoes_usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    token_sessao VARCHAR(255) UNIQUE NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_expiracao TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    ativa BOOLEAN DEFAULT TRUE
);

-- Tabela de Logs de Atividades
CREATE TABLE IF NOT EXISTS public.logs_atividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id),
    acao VARCHAR(100) NOT NULL,
    entidade VARCHAR(50),
    entidade_id UUID,
    detalhes JSONB,
    ip_address INET,
    user_agent TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA OTIMIZAÇÃO
-- =====================================================

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON public.usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_cpf ON public.usuarios(cpf);
CREATE INDEX IF NOT EXISTS idx_cursos_categoria ON public.cursos(categoria);
CREATE INDEX IF NOT EXISTS idx_cursos_status ON public.cursos(status);
CREATE INDEX IF NOT EXISTS idx_inscricoes_usuario ON public.inscricoes_cursos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_inscricoes_curso ON public.inscricoes_cursos(curso_id);
CREATE INDEX IF NOT EXISTS idx_progresso_usuario ON public.progresso_aulas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_certificados_usuario ON public.certificados(usuario_id);
CREATE INDEX IF NOT EXISTS idx_certificados_codigo ON public.certificados(codigo_verificacao);
CREATE INDEX IF NOT EXISTS idx_vagas_status ON public.vagas(status);
CREATE INDEX IF NOT EXISTS idx_candidaturas_usuario ON public.candidaturas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_candidaturas_vaga ON public.candidaturas(vaga_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_token ON public.sessoes_usuarios(token_sessao);
CREATE INDEX IF NOT EXISTS idx_logs_usuario ON public.logs_atividades(usuario_id);
CREATE INDEX IF NOT EXISTS idx_logs_data ON public.logs_atividades(data_criacao);

-- =====================================================
-- FUNÇÕES E TRIGGERS
-- =====================================================

-- Função para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION update_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar data_atualizacao
CREATE TRIGGER trigger_update_usuarios
    BEFORE UPDATE ON public.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_data_atualizacao();

CREATE TRIGGER trigger_update_cursos
    BEFORE UPDATE ON public.cursos
    FOR EACH ROW
    EXECUTE FUNCTION update_data_atualizacao();

-- Função para gerar código de verificação único
CREATE OR REPLACE FUNCTION gerar_codigo_verificacao()
RETURNS VARCHAR(50) AS $$
DECLARE
    codigo VARCHAR(50);
    existe BOOLEAN;
BEGIN
    LOOP
        codigo := 'CERT-' || upper(substring(md5(random()::text) from 1 for 8));
        SELECT EXISTS(SELECT 1 FROM public.certificados WHERE codigo_verificacao = codigo) INTO existe;
        IF NOT existe THEN
            RETURN codigo;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Função para verificar se curso foi concluído
CREATE OR REPLACE FUNCTION verificar_conclusao_curso()
RETURNS TRIGGER AS $$
DECLARE
    total_aulas INTEGER;
    aulas_concluidas INTEGER;
    curso_id UUID;
BEGIN
    -- Obter o curso_id através do modulo_id
    SELECT c.id INTO curso_id
    FROM public.cursos c
    JOIN public.modulos m ON c.id = m.curso_id
    JOIN public.aulas a ON m.id = a.modulo_id
    WHERE a.id = NEW.aula_id;
    
    -- Contar total de aulas do curso
    SELECT COUNT(*) INTO total_aulas
    FROM public.aulas a
    JOIN public.modulos m ON a.modulo_id = m.id
    WHERE m.curso_id = curso_id;
    
    -- Contar aulas concluídas pelo usuário
    SELECT COUNT(*) INTO aulas_concluidas
    FROM public.progresso_aulas pa
    JOIN public.aulas a ON pa.aula_id = a.id
    JOIN public.modulos m ON a.modulo_id = m.id
    WHERE pa.usuario_id = NEW.usuario_id 
    AND m.curso_id = curso_id 
    AND pa.concluida = TRUE;
    
    -- Se todas as aulas foram concluídas, marcar curso como concluído
    IF aulas_concluidas = total_aulas THEN
        UPDATE public.inscricoes_cursos 
        SET status = 'concluido', 
            progresso_percentual = 100,
            data_conclusao = NOW()
        WHERE usuario_id = NEW.usuario_id AND curso_id = curso_id;
        
        -- Gerar certificado automaticamente
        INSERT INTO public.certificados (
            usuario_id, 
            curso_id, 
            codigo_verificacao,
            titulo_curso,
            nome_aluno,
            data_conclusao
        )
        SELECT 
            NEW.usuario_id,
            curso_id,
            gerar_codigo_verificacao(),
            c.titulo,
            u.nome || ' ' || u.sobrenome,
            NOW()
        FROM public.cursos c, public.usuarios u
        WHERE c.id = curso_id AND u.id = NEW.usuario_id
        ON CONFLICT (usuario_id, curso_id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para verificar conclusão de curso
CREATE TRIGGER trigger_verificar_conclusao
    AFTER UPDATE ON public.progresso_aulas
    FOR EACH ROW
    WHEN (OLD.concluida = FALSE AND NEW.concluida = TRUE)
    EXECUTE FUNCTION verificar_conclusao_curso();

-- =====================================================
-- POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progresso_aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avaliacoes_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessoes_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs_atividades ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Usuários podem ver e editar seus próprios dados" ON public.usuarios
    FOR ALL USING (auth.uid()::text = id::text);

-- Políticas para cursos (leitura pública, escrita apenas para instrutores)
CREATE POLICY "Cursos são visíveis publicamente" ON public.cursos
    FOR SELECT USING (status = 'ativo');

CREATE POLICY "Instrutores podem gerenciar cursos" ON public.cursos
    FOR ALL USING (instrutor_id::text = auth.uid()::text);

-- Políticas para inscrições
CREATE POLICY "Usuários podem ver suas próprias inscrições" ON public.inscricoes_cursos
    FOR ALL USING (usuario_id::text = auth.uid()::text);

-- Políticas para progresso
CREATE POLICY "Usuários podem gerenciar seu próprio progresso" ON public.progresso_aulas
    FOR ALL USING (usuario_id::text = auth.uid()::text);

-- Políticas para certificados
CREATE POLICY "Certificados são visíveis publicamente para verificação" ON public.certificados
    FOR SELECT USING (status = 'valido');

CREATE POLICY "Usuários podem ver seus próprios certificados" ON public.certificados
    FOR ALL USING (usuario_id::text = auth.uid()::text);

-- Políticas para vagas
CREATE POLICY "Vagas ativas são visíveis publicamente" ON public.vagas
    FOR SELECT USING (status = 'ativa');

-- Políticas para candidaturas
CREATE POLICY "Usuários podem gerenciar suas candidaturas" ON public.candidaturas
    FOR ALL USING (usuario_id::text = auth.uid()::text);

CREATE POLICY "Empresas podem ver candidaturas para suas vagas" ON public.candidaturas
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.vagas v 
            WHERE v.id = candidaturas.vaga_id 
            AND v.empresa_id::text = auth.uid()::text
        )
    );

-- =====================================================
-- COMENTÁRIOS DAS TABELAS
-- =====================================================

COMMENT ON TABLE public.usuarios IS 'Tabela principal de usuários do sistema';
COMMENT ON TABLE public.cursos IS 'Cursos disponíveis na plataforma';
COMMENT ON TABLE public.modulos IS 'Módulos que compõem os cursos';
COMMENT ON TABLE public.aulas IS 'Aulas individuais dentro dos módulos';
COMMENT ON TABLE public.inscricoes_cursos IS 'Relacionamento entre usuários e cursos';
COMMENT ON TABLE public.progresso_aulas IS 'Progresso individual de cada usuário nas aulas';
COMMENT ON TABLE public.certificados IS 'Certificados emitidos para cursos concluídos';
COMMENT ON TABLE public.vagas IS 'Vagas de emprego disponíveis';
COMMENT ON TABLE public.candidaturas IS 'Candidaturas dos usuários para vagas';
COMMENT ON TABLE public.avaliacoes_cursos IS 'Avaliações dos usuários sobre os cursos';
COMMENT ON TABLE public.sessoes_usuarios IS 'Sessões ativas dos usuários';
COMMENT ON TABLE public.logs_atividades IS 'Log de todas as atividades do sistema'; 

-- Remover campos de preço dos cursos
ALTER TABLE public.cursos DROP COLUMN IF EXISTS preco;
ALTER TABLE public.cursos DROP COLUMN IF EXISTS preco_promocional; 
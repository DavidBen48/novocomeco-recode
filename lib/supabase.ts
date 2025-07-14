// importei o PostgreSQL vindo do SupaBase
import { createClient } from '@supabase/supabase-js'

/*
  PostgreSQL usado (em vez de MySQL) em forma de hospedagem via web.
  Preferi usar esse método por questões de segurança. Na minha máquina,
  o workbench acaba falhando várias vezes em meus projetos, mas é questões de
  máquina mesmo.
  Logo, para que isso não aconteça entre o Deploy e a apresentação do projeto,
  preferi usar o SupaBase para armazenar os dados, tendo visto que
  houve problemas em meus últimos projetos usando DataBase na máquina,
  e não houve problemas quando comecei a usar o PostgreSQL dentro do SupaBase.
*/

// outro detalhe: o banco de dados é importado no projeto em forma de API.

// URL do database
const supabaseUrl = 'https://aoswpkxmtsyzlpogoepj.supabase.co'
// Chave API Anônima 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvc3dwa3htdHN5emxwb2dvZXBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTU4NTQyOCwiZXhwIjoyMDY3MTYxNDI4fQ.4rCm0KOScVLK8CK9trRcyifEez7LKL8oIJzKBAvxbC0'

// exportar dados do usuário
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos (TypeScript) para as tabelas
export interface Usuario {
  id: string
  email: string
  nome: string
  sobrenome: string
  cpf?: string
  telefone?: string
  data_nascimento?: string
  genero?: string
  endereco?: string
  cidade?: string
  estado?: string
  cep?: string
  bio?: string
  avatar_url?: string
  status: string
  tipo_usuario: string
  data_criacao: string
  data_atualizacao: string
  ultimo_login?: string
  email_verificado: boolean
  telefone_verificado: boolean
}

export interface Curso {
  id: string
  titulo: string
  descricao?: string
  categoria: string
  nivel: string
  duracao_horas: number
  imagem_url?: string
  video_intro_url?: string
  status: string
  data_criacao: string
  data_atualizacao: string
  instrutor_id?: string
  tags?: string[]
  requisitos?: string[]
  objetivos?: string[]
}

export interface InscricaoCurso {
  id: string
  usuario_id: string
  curso_id: string
  status: string
  progresso_percentual: number
  data_inscricao: string
  data_conclusao?: string
  data_cancelamento?: string
}

export interface Certificado {
  id: string
  usuario_id: string
  curso_id: string
  codigo_verificacao: string
  titulo_curso: string
  nome_aluno: string
  data_conclusao: string
  data_emissao: string
  url_certificado?: string
  status: string
}

export interface Vaga {
  id: string
  titulo: string
  empresa: string
  descricao?: string
  requisitos?: string[]
  beneficios?: string[]
  salario_min?: number
  salario_max?: number
  tipo_contrato?: string
  modalidade?: string
  localizacao?: string
  nivel_experiencia?: string
  area_atuacao?: string
  status: string
  data_publicacao: string
  data_encerramento?: string
  contato_email?: string
  contato_telefone?: string
  empresa_id?: string
}

export interface Candidatura {
  id: string
  usuario_id: string
  vaga_id: string
  status: string
  data_candidatura: string
  data_analise?: string
  observacoes?: string
  cv_url?: string
  carta_motivacao?: string
}
-- ============================================
-- Professor Site - Database Schema
-- Neon PostgreSQL
-- ============================================

-- Tabela principal: Dados gerais da professora
CREATE TABLE IF NOT EXISTS professor_dados_gerais (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) UNIQUE NOT NULL,
  nome_completo VARCHAR(255) NOT NULL,
  nome_citacoes TEXT,
  orcid VARCHAR(50),
  nacionalidade VARCHAR(100),
  updated_at TIMESTAMP DEFAULT NOW(),
  lattes_xml_backup TEXT
);

CREATE INDEX IF NOT EXISTS idx_lattes_id ON professor_dados_gerais(lattes_id);

-- Tabela: Formação Acadêmica
CREATE TABLE IF NOT EXISTS professor_formacao (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('graduacao', 'mestrado', 'doutorado')),
  curso VARCHAR(255),
  instituicao VARCHAR(255),
  ano_inicio INTEGER,
  ano_conclusao INTEGER,
  titulo_trabalho TEXT,
  orientador VARCHAR(255),
  bolsa VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_formacao_lattes ON professor_formacao(lattes_id);

-- Tabela: Áreas de Atuação
CREATE TABLE IF NOT EXISTS professor_areas_atuacao (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  grande_area VARCHAR(255),
  area VARCHAR(255),
  subarea VARCHAR(255),
  especialidade VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: Linhas de Pesquisa
CREATE TABLE IF NOT EXISTS professor_linhas_pesquisa (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  nome VARCHAR(255) NOT NULL,
  objetivo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: Artigos Publicados
CREATE TABLE IF NOT EXISTS professor_artigos (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  titulo TEXT NOT NULL,
  ano INTEGER NOT NULL,
  periodico VARCHAR(255),
  volume VARCHAR(50),
  pagina_inicial VARCHAR(20),
  pagina_final VARCHAR(20),
  doi VARCHAR(100),
  autores TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artigos_ano ON professor_artigos(ano DESC);
CREATE INDEX IF NOT EXISTS idx_artigos_lattes ON professor_artigos(lattes_id);

-- Tabela: Livros Publicados
CREATE TABLE IF NOT EXISTS professor_livros (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  tipo VARCHAR(20) CHECK (tipo IN ('livro_completo', 'capitulo')),
  titulo TEXT NOT NULL,
  ano INTEGER NOT NULL,
  editora VARCHAR(255),
  isbn VARCHAR(20),
  titulo_livro_capitulo TEXT,
  pagina_inicial VARCHAR(20),
  pagina_final VARCHAR(20),
  autores TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_livros_ano ON professor_livros(ano DESC);

-- Tabela: Orientações
CREATE TABLE IF NOT EXISTS professor_orientacoes (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  tipo VARCHAR(20) CHECK (tipo IN ('mestrado', 'doutorado', 'pos_doutorado', 'graduacao')),
  orientando VARCHAR(255) NOT NULL,
  titulo TEXT,
  ano INTEGER,
  instituicao VARCHAR(255),
  status VARCHAR(50) CHECK (status IN ('concluida', 'em_andamento')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orientacoes_tipo ON professor_orientacoes(tipo, status);

-- Tabela: Atuações Profissionais
CREATE TABLE IF NOT EXISTS professor_atuacoes (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  instituicao VARCHAR(255) NOT NULL,
  cargo VARCHAR(255),
  periodo_inicio DATE,
  periodo_fim DATE,
  vinculo VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: Idiomas
CREATE TABLE IF NOT EXISTS professor_idiomas (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  idioma VARCHAR(50) NOT NULL,
  leitura VARCHAR(50),
  escrita VARCHAR(50),
  conversacao VARCHAR(50),
  compreensao VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: Eventos e Congressos
CREATE TABLE IF NOT EXISTS professor_eventos (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  tipo VARCHAR(50),
  nome_evento TEXT NOT NULL,
  titulo_trabalho TEXT,
  ano INTEGER,
  cidade VARCHAR(100),
  pais VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eventos_ano ON professor_eventos(ano DESC);

-- Tabela de controle de sincronização
CREATE TABLE IF NOT EXISTS sync_log (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16),
  sync_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) CHECK (status IN ('success', 'error', 'partial')),
  records_updated INTEGER,
  error_message TEXT,
  xml_hash VARCHAR(64)
);

CREATE INDEX IF NOT EXISTS idx_sync_date ON sync_log(sync_date DESC);

-- Verificação final
SELECT 'Schema criado com sucesso!' as status;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;


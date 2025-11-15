# Plano de Integração do Site com Plataforma Lattes

**Projeto:** Professor Site - Mariana Sombrio  
**Data:** Novembro 2024  
**Stack:** Next.js + Vercel + Neon PostgreSQL + R (getLattes)

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura da Solução](#arquitetura-da-solução)
3. [Dados a Serem Extraídos](#dados-a-serem-extraídos)
4. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
5. [Setup Inicial: Vercel + Neon + GitHub](#setup-inicial-vercel--neon--github)
6. [Implementação da API](#implementação-da-api)
7. [Script de Extração do Lattes](#script-de-extração-do-lattes)
8. [Cronograma de Implementação](#cronograma-de-implementação)
9. [Comandos e Referências](#comandos-e-referências)

---

## 1. Visão Geral

### Objetivo
Automatizar a extração de dados do currículo Lattes da Professora Mariana Sombrio e exibir essas informações no site institucional, com atualizações periódicas.

### Fluxo de Dados
```
Currículo Lattes (XML)
    ↓
Script R (getLattes) - Extração
    ↓
Vercel API Route (Node.js) - Processamento
    ↓
Neon PostgreSQL - Armazenamento
    ↓
Frontend Next.js - Exibição
```

### Integração GitHub
- **Repository:** professor-site
- **Branch principal:** main
- **Deploy automático:** Vercel (via GitHub Integration)
- **Database branches:** Neon (preview branches automáticos)

---

## 2. Arquitetura da Solução

### Stack Completo

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js)                │
│  - Componentes React                        │
│  - Server Components para data fetching     │
│  - Client Components para interatividade    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────┴───────────────────────────┐
│      Vercel Serverless Functions            │
│  - /api/lattes/sync.ts                      │
│  - /api/lattes/publicacoes.ts               │
│  - /api/lattes/formacao.ts                  │
│  - /api/cron/update-lattes.ts (mensalmente) │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────┴───────────────────────────┐
│         Neon PostgreSQL                     │
│  - professor_data (main table)              │
│  - publicacoes                              │
│  - formacao                                 │
│  - orientacoes                              │
│  - projetos                                 │
└─────────────────────────────────────────────┘
```

### Integrações
1. **GitHub ↔ Vercel**: Deploy automático em push
2. **GitHub ↔ Neon**: Preview branches automáticos
3. **Vercel ↔ Neon**: Connection pooling nativo

---

## 3. Dados a Serem Extraídos

### 📚 Publicações
- **`getArtigosPublicados()`**
  - Título, ano, periódico, DOI
  - Autores, citações bibliográficas
- **`getLivrosPublicados()`**
  - Título, ano, editora, ISBN
- **`getCapitulosLivros()`**
  - Título do capítulo, livro, ano

### 🎓 Formação Acadêmica
- **`getFormacaoGraduacao()`**
  - Curso, instituição, ano de conclusão
- **`getFormacaoMestrado()`**
  - Programa, instituição, ano, orientador
- **`getFormacaoDoutorado()`**
  - Programa, instituição, ano, orientador

### 🔬 Áreas de Pesquisa
- **`getAreasAtuacao()`**
  - Grande área, área, especialidade
- **`getLinhaPesquisa()`**
  - Nome da linha, descrição

### 👥 Orientações
- **`getOrientacoesMestrado()`**
  - Orientando, título, ano, status
- **`getOrientacoesDoutorado()`**
  - Orientando, título, ano, status

### 💼 Atuação Profissional
- **`getAtuacoesProfissionais()`**
  - Instituição, cargo, período

### 🌐 Dados Gerais
- **`getDadosGerais()`**
  - Nome completo, ORCID, Lattes ID
- **`getIdiomas()`**
  - Idioma, proficiência

### 🎪 Eventos e Produções
- **`getEventosCongressos()`**
  - Nome do evento, ano, participação
- **`getTrabalhosEmEventos()`**
  - Título, evento, ano

---

## 4. Estrutura do Banco de Dados

### Schema SQL (Neon PostgreSQL)

```sql
-- Tabela principal: Dados gerais da professora
CREATE TABLE professor_dados_gerais (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) UNIQUE NOT NULL,
  nome_completo VARCHAR(255) NOT NULL,
  nome_citacoes TEXT,
  orcid VARCHAR(50),
  nacionalidade VARCHAR(100),
  updated_at TIMESTAMP DEFAULT NOW(),
  lattes_xml_backup TEXT -- Backup do XML original
);

-- Índice para busca rápida
CREATE INDEX idx_lattes_id ON professor_dados_gerais(lattes_id);

-- Tabela: Formação Acadêmica
CREATE TABLE professor_formacao (
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

CREATE INDEX idx_formacao_lattes ON professor_formacao(lattes_id);

-- Tabela: Áreas de Atuação
CREATE TABLE professor_areas_atuacao (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  grande_area VARCHAR(255),
  area VARCHAR(255),
  subarea VARCHAR(255),
  especialidade VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: Linhas de Pesquisa
CREATE TABLE professor_linhas_pesquisa (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  nome VARCHAR(255) NOT NULL,
  objetivo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: Artigos Publicados
CREATE TABLE professor_artigos (
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

CREATE INDEX idx_artigos_ano ON professor_artigos(ano DESC);
CREATE INDEX idx_artigos_lattes ON professor_artigos(lattes_id);

-- Tabela: Livros Publicados
CREATE TABLE professor_livros (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  tipo VARCHAR(20) CHECK (tipo IN ('livro_completo', 'capitulo')),
  titulo TEXT NOT NULL,
  ano INTEGER NOT NULL,
  editora VARCHAR(255),
  isbn VARCHAR(20),
  titulo_livro_capitulo TEXT, -- Para capítulos
  pagina_inicial VARCHAR(20),
  pagina_final VARCHAR(20),
  autores TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_livros_ano ON professor_livros(ano DESC);

-- Tabela: Orientações
CREATE TABLE professor_orientacoes (
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

CREATE INDEX idx_orientacoes_tipo ON professor_orientacoes(tipo, status);

-- Tabela: Atuações Profissionais
CREATE TABLE professor_atuacoes (
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
CREATE TABLE professor_idiomas (
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
CREATE TABLE professor_eventos (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16) REFERENCES professor_dados_gerais(lattes_id),
  tipo VARCHAR(50), -- participacao, organizacao, trabalho
  nome_evento TEXT NOT NULL,
  titulo_trabalho TEXT,
  ano INTEGER,
  cidade VARCHAR(100),
  pais VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_eventos_ano ON professor_eventos(ano DESC);

-- Tabela de controle de sincronização
CREATE TABLE sync_log (
  id SERIAL PRIMARY KEY,
  lattes_id VARCHAR(16),
  sync_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) CHECK (status IN ('success', 'error', 'partial')),
  records_updated INTEGER,
  error_message TEXT,
  xml_hash VARCHAR(64) -- SHA256 do XML para detectar mudanças
);

CREATE INDEX idx_sync_date ON sync_log(sync_date DESC);
```

---

## 5. Setup Inicial: Vercel + Neon + GitHub

### 📋 Pré-requisitos
- [ ] Conta GitHub (com repositório professor-site)
- [ ] Conta Vercel (criar gratuitamente)
- [ ] Conta Neon (criar gratuitamente)
- [ ] Git configurado localmente
- [ ] Node.js 18+ instalado

**Ver guia detalhado em:** `vercel-neon-deployment-guide.md`

---

## 6. Implementação da API

### 📁 Estrutura de arquivos

```
code/src/
├── app/
│   ├── api/
│   │   ├── lattes/
│   │   │   ├── sync/route.ts         # POST - sincronizar dados do Lattes
│   │   │   ├── publicacoes/route.ts  # GET - buscar publicações
│   │   │   ├── formacao/route.ts     # GET - buscar formação
│   │   │   └── profile/route.ts      # GET - dados gerais
│   │   └── cron/
│   │       └── update-lattes/route.ts # Cron job mensal
├── lib/
│   ├── db/
│   │   ├── neon.ts                   # Cliente Neon
│   │   └── queries.ts                # Queries SQL
│   └── lattes/
│       ├── parser.ts                 # Parse XML do Lattes
│       └── fetcher.ts                # Download XML
└── types/
    └── lattes.ts                     # TypeScript types
```

### Dependências Necessárias

```bash
npm install @neondatabase/serverless
npm install fast-xml-parser
npm install -D @types/node
```

---

## 7. Script de Extração do Lattes

### Abordagem Recomendada

**Fase 1:** Upload manual do XML + Parse via API
**Fase 2:** Automatização com R script (getLattes)
**Fase 3:** Cron job mensal para atualização

### Fluxo de Sincronização

1. Usuário faz download do XML do Lattes
2. Upload via interface web ou API
3. Parse do XML e extração de dados
4. Inserção/atualização no banco Neon
5. Log de sincronização
6. Notificação de sucesso/erro

---

## 8. Cronograma de Implementação

### 📅 Fase 1: Setup e Infraestrutura (1-2 dias)

- [ ] Criar conta Neon
- [ ] Criar conta Vercel
- [ ] Configurar integração GitHub → Vercel
- [ ] Configurar integração GitHub → Neon
- [ ] Configurar integração Neon ↔ Vercel
- [ ] Criar schema do banco de dados
- [ ] Testar conexão Vercel → Neon

### 📅 Fase 2: API Backend (2-3 dias)

- [ ] Implementar cliente Neon
- [ ] Criar TypeScript types
- [ ] Implementar queries do banco
- [ ] Criar API route: `/api/lattes/sync` (upload XML)
- [ ] Criar API route: `/api/lattes/profile`
- [ ] Criar API route: `/api/lattes/publicacoes`
- [ ] Testar upload manual de XML

### 📅 Fase 3: Frontend Components (2-3 dias)

- [ ] Criar componente: Profile Header
- [ ] Criar componente: Publications List
- [ ] Criar componente: Education Timeline
- [ ] Criar componente: Research Areas
- [ ] Criar componente: Supervisions
- [ ] Integrar componentes com API

### 📅 Fase 4: Automação (1-2 dias)

- [ ] Implementar Vercel Cron Job (mensal)
- [ ] Testar sincronização automática
- [ ] Configurar notificações de erro
- [ ] Documentar processo de atualização manual

### 📅 Fase 5: Deploy e Testes (1 dia)

- [ ] Deploy em produção
- [ ] Testes end-to-end
- [ ] Validação de dados
- [ ] Ajustes finais

**Total estimado: 7-11 dias**

---

## 9. Comandos e Referências

### 🛠️ Comandos Úteis

```bash
# ===== LOCAL DEVELOPMENT =====

# Instalar dependências
cd code
npm install

# Rodar desenvolvimento local
npm run dev

# Build para produção
npm run build

# ===== GIT =====

# Criar branch de feature
git checkout -b feature/lattes-integration

# Commit e push
git add .
git commit -m "feat: add Lattes integration API"
git push origin feature/lattes-integration

# Merge para main (depois de testar)
git checkout main
git merge feature/lattes-integration
git push origin main

# ===== VERCEL CLI =====

# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link projeto
vercel link

# Deploy preview
vercel

# Deploy produção
vercel --prod

# Ver logs
vercel logs

# ===== NEON CLI =====

# Instalar Neon CLI
npm i -g neonctl

# Login
neonctl auth

# Listar projetos
neonctl projects list

# Conectar ao banco
neonctl connection-string professor-site-db

# ===== DATABASE =====

# Conectar via psql
psql "$(neonctl connection-string professor-site-db)"

# Backup
pg_dump "$(neonctl connection-string professor-site-db)" > backup.sql

# Restore
psql "$(neonctl connection-string professor-site-db)" < backup.sql
```

### 📚 Referências Importantes

| Documentação | URL |
|--------------|-----|
| Neon Docs | https://neon.com/docs |
| Neon + Vercel | https://neon.com/docs/guides/vercel-overview |
| Vercel Docs | https://vercel.com/docs |
| Vercel Cron Jobs | https://vercel.com/docs/cron-jobs |
| GitHub Integration | https://vercel.com/docs/git/vercel-for-github |
| Next.js API Routes | https://nextjs.org/docs/app/building-your-application/routing/route-handlers |
| getLattes R Package | https://cran.r-project.org/web/packages/getLattes/vignettes/introduction_getLattes.html |

### 🔐 Variáveis de Ambiente

```bash
# .env.local (desenvolvimento)
DATABASE_URL=postgresql://user:password@localhost:5432/professor_db
LATTES_ID=1234567890123456

# Vercel (produção) - adicionadas automaticamente pela integração
DATABASE_URL=
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
```

### 📝 Checklist Final

Antes de fazer deploy em produção:

- [ ] Todas as tabelas criadas no Neon
- [ ] Integração GitHub ↔ Vercel funcionando
- [ ] Integração GitHub ↔ Neon funcionando
- [ ] Preview branches criando databases automaticamente
- [ ] API `/api/lattes/sync` testada com XML real
- [ ] API `/api/lattes/profile` retornando dados
- [ ] Frontend exibindo dados do banco
- [ ] Erro handling implementado
- [ ] Logs configurados
- [ ] Backup do XML original armazenado
- [ ] Documentação atualizada

---

## 📞 Suporte

**Problemas com Neon:**
- Docs: https://neon.com/docs
- Discord: https://discord.gg/neon

**Problemas com Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/help

**Problemas com o projeto:**
- GitHub Issues: criar issue no repositório

---

## 🎯 Próximos Passos

1. Seguir o guia `vercel-neon-deployment-guide.md` para setup inicial
2. Implementar os API routes conforme estrutura acima
3. Criar componentes React para exibição dos dados
4. Testar sincronização com XML real do Lattes
5. Configurar automação mensal

---

**Documento criado em:** Novembro 2024  
**Última atualização:** Novembro 2024  
**Versão:** 1.0


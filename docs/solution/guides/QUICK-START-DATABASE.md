# Quick Start: Executar Schema do Banco de Dados

**Status Atual:** Você já tem Neon e Vercel configurados! ✅  
**Próximo Passo:** Criar as tabelas no banco de dados

---

## 🎯 Opção 1: Via Neon Console (Mais Rápido)

### Passo 1: Acessar SQL Editor

1. Vá para: https://console.neon.tech
2. Selecione seu projeto: `professor-site` 
3. Clique em **"SQL Editor"** na barra lateral (ícone `</>`)

### Passo 2: Copiar e Executar SQL

1. Abra o arquivo que criamos:
   ```bash
   cat /Users/me/Sites/danielvm-git/professor-site/code/scripts/init-database.sql
   ```

2. **Copie todo o conteúdo** (Cmd+A, Cmd+C)

3. **Cole no SQL Editor** do Neon (Cmd+V)

4. Clique em **"Run"** (ou pressione Cmd+Enter)

### Passo 3: Verificar Tabelas Criadas

Execute no SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

✅ **Você deve ver 11 tabelas:**
- professor_areas_atuacao
- professor_artigos
- professor_atuacoes
- professor_dados_gerais
- professor_eventos
- professor_formacao
- professor_idiomas
- professor_linhas_pesquisa
- professor_livros
- professor_orientacoes
- sync_log

---

## 🎯 Opção 2: Via Neon CLI (Terminal)

### Passo 1: Instalar Neon CLI

Escolha um método:

```bash
# Via Homebrew (recomendado para macOS)
brew install neonctl

# Via npm
npm i -g neonctl

# Via bun
bun install -g neonctl
```

Referência: [Neon CLI Install](https://neon.com/docs/reference/neon-cli)

### Passo 2: Autenticar

```bash
neonctl auth
```

Isso vai abrir o navegador para você fazer login.

### Passo 3: Listar Seus Projetos

```bash
neonctl projects list
```

Procure pelo ID do projeto `professor-site-db`.

### Passo 4: Obter Connection String

```bash
# Substitua pelo ID do seu projeto
neonctl connection-string --project-id <seu-project-id>
```

Ou veja direto no dashboard Neon (já tem nas suas screenshots).

### Passo 5: Executar SQL via psql

```bash
# Instalar PostgreSQL client (se não tiver)
brew install postgresql

# Conectar e executar o script
psql "postgresql://user:pass@ep-xxxxx.aws.neon.tech/neondb?sslmode=require" \
  -f /Users/me/Sites/danielvm-git/professor-site/code/scripts/init-database.sql
```

---

## 🎯 Opção 3: Via Node.js Script (Automatizado)

Vou criar um script Node.js para você executar o schema:

```bash
cd /Users/me/Sites/danielvm-git/professor-site/code
node scripts/setup-database.js
```

Aguarde, vou criar esse script agora...

---

## ✅ Após Executar o Schema

### 1. Verificar no Neon Dashboard

- Dashboard → Seu projeto → Tables
- Você verá todas as 11 tabelas listadas

### 2. Testar Inserção de Dados

Execute no SQL Editor:

```sql
-- Inserir dados de teste
INSERT INTO professor_dados_gerais (
  lattes_id, 
  nome_completo, 
  nome_citacoes, 
  nacionalidade
) VALUES (
  '0000000000000000',
  'Mariana Sombrio',
  'SOMBRIO, M.; Sombrio, Mariana',
  'Brasil'
);

-- Verificar
SELECT * FROM professor_dados_gerais;
```

Se funcionar, o schema está correto! ✅

---

## 🔄 Próximos Passos (Após Schema Criado)

1. ✅ Schema do banco criado
2. ⬜ Implementar API Routes no Next.js
3. ⬜ Criar componentes React para exibir dados
4. ⬜ Baixar XML do Lattes
5. ⬜ Fazer primeiro sync dos dados

---

## 🆘 Troubleshooting

### Erro: "relation already exists"

Isso é OK! Significa que a tabela já existe. O script usa `CREATE TABLE IF NOT EXISTS`.

### Erro: "permission denied"

Verifique se está usando o usuário correto (geralmente `neondb_owner`).

### Erro: "connection refused"

1. Verifique a connection string
2. Confirme que o projeto Neon está ativo
3. Teste no SQL Editor do console primeiro

---

## 📚 Referências

- [Neon CLI Documentation](https://neon.com/docs/reference/neon-cli)
- [Neon SQL Editor](https://neon.com/docs/get-started-with-neon/query-with-neon-sql-editor)
- Guia completo: `vercel-neon-deployment-guide.md`

---

**Recomendação:** Use a **Opção 1 (Neon Console)** por ser a mais rápida e visual! 🚀


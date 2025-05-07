# 🚀 Task Manager API

API CRUD simples para gerenciamento de tarefas usando Node.js nativo com armazenamento em JSON

## ✨ Funcionalidades

- **CRUD completo** de tarefas (Create, Read, Update, Delete)
- Busca de tarefas por título e descrição
- Marcar tarefas como completas
- Persistência de dados em arquivo JSON
- Validação de dados automática
- Filtragem e ordenação básica

## 🛠 Tecnologias

- **Runtime**: Node.js 18+
- **Banco de Dados**: JSON File (db.json)
- **HTTP Server**: Módulo nativo `http`
- **UUID**: Geração de IDs únicos

## ⚡ Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- NPM/Yarn

### Passos para Instalação

```bash
# Clone o repositório
git clone https://github.com/Schambin/raw-crud-js.git
cd raw-crud-js

# Instale as dependências (caso existam)
npm install

# Inicie o servidor
node server.js
```

**A API estará disponível em**: `http://localhost:3000`

## 📚 Endpoints da API

Listar tarefas (GET)

```http

GET /tasks
```

### Parâmetros de busca:

- title: Filtrar por título
- description: Filtrar por descrição

#### Criar tarefa (POST)

```http

POST /tasks
```

Body:

```json
{
  "title": "Título da tarefa",
  "description": "Descrição detalhada"
}
```

#### Atualizar tarefa (PUT)

```http

PUT /tasks/{id}
```

Body:

```json
{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

#### Deletar tarefa (DELETE)

```http

DELETE /tasks/{id}
```

#### Marcar como completa (PATCH)

```http

PATCH /tasks/{id}/complete
```

### 🗃 Estrutura dos Dados

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed_at": "datetime|null",
  "created_at": "datetime",
  "updated_at": "datetime|null"
}
```

## 🧪 Exemplos de Uso

### Criar tarefa

```bash

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar Node.js","description":"Praticar módulos nativos"}'
```

### Listar tarefas incompletas

```bash

curl "http://localhost:3000/tasks?title=Estudar"
```

### Marcar tarefa como completa

```bash

curl -X PATCH http://localhost:3000/tasks/ID_DA_TAREFA/complete
```

## 📌 Notas Técnicas

- Persistência de dados: Armazenamento automático em db.json

- Validação: Campos obrigatórios são verificados automaticamente

- IDs: Gerados automaticamente usando randomUUID

- Datas: Formatadas em ISO 8601 (YYYY-MM-DD HH:mm:ss)

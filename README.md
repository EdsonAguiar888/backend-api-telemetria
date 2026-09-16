# Documentação da API, Imóveis, Medidores e Leituras

## Visão geral

Esta documentação descreve os endpoints da API para gerenciamento de imóveis, medidores, leituras e consumo agregado.

### Módulos

1. **Imóveis**, `/imoveis`
2. **Medidores**, `/medidores`
3. **Leituras**, `/leituras`
4. **Consumo Agregado**, `/medidores/:id/consumo`

### Convenções

- IDs são representados por UUID.
- Os dados de entrada e saída utilizam JSON.
- Datas e horários utilizam o formato ISO 8601.
- Respostas de criação utilizam `201 Created`.
- Respostas de consulta e atualização utilizam `200 OK`.
- Exclusões retornam `200 OK` com corpo vazio, conforme especificação apresentada.

---

# 1. Módulo de Imóveis

Base URL do módulo:

```text
/imoveis
```

## POST /imoveis

### Descrição

Cadastra um novo imóvel.

### Body

```json
{
  "nome": "Edifício Central",
  "endereco": "Av. Boa Viagem, 500 - Recife/PE"
}
```

### Retorno esperado

**HTTP 201 Created**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Edifício Central",
  "endereco": "Av. Boa Viagem, 500 - Recife/PE"
}
```

---

## GET /imoveis

### Descrição

Retorna a lista de todos os imóveis cadastrados, incluindo seus medidores associados.

### Retorno esperado

**HTTP 200 OK**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Edifício Central",
    "endereco": "Av. Boa Viagem, 500 - Recife/PE",
    "medidores": [
      {
        "id": "987e6543-e89b-12d3-a456-426614174000",
        "identificador": "MED-AGUA-101",
        "tipo": "AGUA"
      }
    ]
  }
]
```

---

## GET /imoveis/:id

### Descrição

Busca um imóvel específico pelo seu ID.

### Parâmetro

| Parâmetro | Tipo |   Descrição  |
|-----------|------|--------------|
|    `id`   | UUID | ID do imóvel |

### Retorno esperado

**HTTP 200 OK**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Edifício Central",
  "endereco": "Av. Boa Viagem, 500 - Recife/PE",
  "medidores": []
}
```

---

## PATCH /imoveis/:id

### Descrição

Atualiza parcialmente os dados de um imóvel.

### Parâmetro

| Parâmetro | Tipo |   Descrição  |
|-----------|------|--------------|
|    `id`   | UUID | ID do imóvel |

### Body

```json
{
  "nome": "Edifício Central - Bloco A"
}
```

### Retorno esperado

**HTTP 200 OK**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Edifício Central - Bloco A",
  "endereco": "Av. Boa Viagem, 500 - Recife/PE"
}
```

---

## DELETE /imoveis/:id

### Descrição

Remove um imóvel do banco de dados.

### Parâmetro

| Parâmetro | Tipo |   Descrição  |
|-----------|------|--------------|
|    `id`   | UUID | ID do imóvel |

### Retorno esperado

**HTTP 200 OK**

Corpo vazio.

---

# 2. Módulo de Medidores

Base URL do módulo:

```text
/medidores
```

## POST /medidores

### Descrição

Cadastra um novo medidor vinculado a um imóvel existente.

### Body

```json
{
  "identificador": "MED-AGUA-101",
  "tipo": "AGUA",
  "imovelId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Retorno esperado

**HTTP 201 Created**

```json
{
  "id": "987e6543-e89b-12d3-a456-426614174000",
  "identificador": "MED-AGUA-101",
  "tipo": "AGUA",
  "imovel": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Edifício Central",
    "endereco": "Av. Boa Viagem, 500 - Recife/PE"
  }
}
```

---

## GET /medidores

### Descrição

Lista todos os medidores juntamente com seus respectivos imóveis.

### Retorno esperado

**HTTP 200 OK**

```json
[
  {
    "id": "987e6543-e89b-12d3-a456-426614174000",
    "identificador": "MED-AGUA-101",
    "tipo": "AGUA",
    "imovel": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "nome": "Edifício Central",
      "endereco": "Av. Boa Viagem, 500 - Recife/PE"
    }
  }
]
```

---

## GET /medidores/:id

### Descrição

Busca um medidor trazendo o imóvel ao qual pertence e seu histórico de leituras.

### Parâmetro

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Retorno esperado

**HTTP 200 OK**

```json
{
  "id": "987e6543-e89b-12d3-a456-426614174000",
  "identificador": "MED-AGUA-101",
  "tipo": "AGUA",
  "imovel": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Edifício Central",
    "endereco": "Av. Boa Viagem, 500 - Recife/PE"
  },
  "leituras": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "dataHora": "2026-09-01T08:00:00.000Z",
      "valor": 100
    }
  ]
}
```

---

## PATCH /medidores/:id

### Descrição

Atualiza os dados de um medidor.

### Parâmetro

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Body

```json
{
  "identificador": "MED-AGUA-101-REV"
}
```

### Retorno esperado

**HTTP 200 OK**

```json
{
  "id": "987e6543-e89b-12d3-a456-426614174000",
  "identificador": "MED-AGUA-101-REV",
  "tipo": "AGUA"
}
```

---

## DELETE /medidores/:id

### Descrição

Remove o medidor e apaga suas leituras vinculadas em cascata.

### Parâmetro

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Retorno esperado

**HTTP 200 OK**

Corpo vazio.

> **Observação:** a exclusão em cascata significa que as leituras associadas ao medidor também são removidas.

---

# 3. Módulo de Leituras

Base URL do módulo:

```text
/leituras
```

## POST /leituras

### Descrição

Registra a medição acumulada, no formato de odômetro, para um determinado medidor.

### Body

```json
{
  "dataHora": "2026-09-01T08:00:00Z",
  "valor": 100.5,
  "medidorId": "987e6543-e89b-12d3-a456-426614174000"
}
```

### Retorno esperado

**HTTP 201 Created**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "dataHora": "2026-09-01T08:00:00.000Z",
  "valor": 100.5,
  "medidor": {
    "id": "987e6543-e89b-12d3-a456-426614174000",
    "identificador": "MED-AGUA-101",
    "tipo": "AGUA"
  }
}
```

---

## GET /leituras

### Descrição

Traz todas as leituras ordenadas da mais recente para a mais antiga.

### Retorno esperado

**HTTP 200 OK**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "dataHora": "2026-09-01T08:00:00.000Z",
    "valor": 100.5,
    "medidor": {
      "id": "987e6543-e89b-12d3-a456-426614174000",
      "identificador": "MED-AGUA-101"
    }
  }
]
```

---

## GET /leituras/:id

### Descrição

Busca uma leitura individual por ID.

### Parâmetro

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Retorno esperado

**HTTP 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "dataHora": "2026-09-01T08:00:00.000Z",
  "valor": 100.5
}
```

---

## PATCH /leituras/:id

### Descrição

Atualiza a data/hora ou o valor de uma leitura.

### Parâmetro

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Body

```json
{
  "valor": 102.0
}
```

### Retorno esperado

**HTTP 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "dataHora": "2026-09-01T08:00:00.000Z",
  "valor": 102.0
}
```

---

## DELETE /leituras/:id

### Descrição

Exclui uma leitura.

### Parâmetro

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Retorno esperado

**HTTP 200 OK**

Corpo vazio.

---

# 4. Módulo de Consumo Agregado

Endpoint:

```text
/medidores/:id/consumo
```

## GET /medidores/:id/consumo

### Descrição

Calcula as diferenças, deltas, entre leituras consecutivas e agrupa os resultados em um formato padronizado:

```json
{
  "name": "...",
  "value": 0
}
```

Esse formato foi definido para ser utilizado diretamente em gráficos no Angular.

### Parâmetro de rota

| Parâmetro | Tipo |   Descrição   |
|-----------|------|---------------|
|    `id`   | UUID | ID do medidor |

### Query Parameters

| Parâmetro | Obrigatório |  Valores |          Descrição            |
|--------|-----|---------------------|-------------------------------|
| `nivel`| Sim | `ano`, `mes`, `dia` | Define o nível de agrupamento |
|  `ano` | Não | Número de 4 dígitos |    Filtra os dados por ano    |
|  `mes` | Não |     `1` a `12`      |    Filtra os dados por mês    |

---

## 4.1 Agrupamento por dia

### Descrição

Retorna o consumo agrupado por dia. O filtro de ano e mês é utilizado para definir o período consultado.

### URL

```text
GET http://localhost:3000/medidores/987e6543-e89b-12d3-a456-426614174000/consumo?nivel=dia&ano=2026&mes=9
```

### Retorno esperado

**HTTP 200 OK**

```json
[
  {
    "name": "1",
    "value": 15.2
  },
  {
    "name": "2",
    "value": 20.8
  },
  {
    "name": "3",
    "value": 12.0
  }
]
```

Nesse exemplo:

- `name` representa o dia.
- `value` representa o consumo agregado daquele dia.

---

## 4.2 Agrupamento por mês

### Descrição

Retorna o consumo agrupado por mês dentro do ano informado.

### URL

```text
GET http://localhost:3000/medidores/987e6543-e89b-12d3-a456-426614174000/consumo?nivel=mes&ano=2026
```

### Retorno esperado

**HTTP 200 OK**

```json
[
  {
    "name": "8",
    "value": 450.0
  },
  {
    "name": "9",
    "value": 48.0
  }
]
```

Nesse exemplo:

- `name` representa o número do mês.
- `value` representa o consumo agregado daquele mês.

---

## 4.3 Agrupamento por ano

### Descrição

Retorna uma visão geral do consumo agrupado por ano.

### URL

```text
GET http://localhost:3000/medidores/987e6543-e89b-12d3-a456-426614174000/consumo?nivel=ano
```

### Retorno esperado

**HTTP 200 OK**

```json
[
  {
    "name": "2025",
    "value": 3450.75
  },
  {
    "name": "2026",
    "value": 498.0
  }
]
```

Nesse exemplo:

- `name` representa o ano.
- `value` representa o consumo agregado daquele ano.

---

# 5. Resumo dos endpoints

| Método |       Endpoint           | Descrição | Status esperado |
|--------|--------------------------|---------------------------------------|-----------------|
|  POST  | `/imoveis`               | Cadastra imóvel                       |   `201 Created` |
|  GET   | `/imoveis`               | Lista imóveis e medidores             |   `200 OK`      |
|  GET   | `/imoveis/:id`           | Busca imóvel por ID                   |   `200 OK`      |
| PATCH  | `/imoveis/:id`           | Atualiza imóvel                       |   `200 OK`      |
| DELETE | `/imoveis/:id`           | Remove imóvel                         |   `200 OK`      |
| POST   | `/medidores`             | Cadastra medidor                      |   `201 Created` |
|  GET   | `/medidores`             | Lista medidores e imóveis             |   `200 OK`      |
|  GET   | `/medidores/:id`         | Busca medidor, imóvel e leituras      |   `200 OK`      |
| PATCH  | `/medidores/:id`         | Atualiza medidor                      |   `200 OK`      |
| DELETE | `/medidores/:id`         | Remove medidor e leituras em cascata  |   `200 OK`      |
| POST   | `/leituras`              | Registra leitura                      |   `201 Created` |
|  GET   | `/leituras`              | Lista leituras, mais recente primeiro |   `200 OK`      |
|  GET   | `/leituras/:id`          | Busca leitura por ID                  |   `200 OK`      |
| PATCH  | `/leituras/:id`          | Atualiza leitura                      |   `200 OK`      |
| DELETE | `/leituras/:id`          | Exclui leitura                        |   `200 OK`      |
|  GET   | `/medidores/:id/consumo` | Calcula e agrupa consumo              |   `200 OK`      |

---

# 6. Relacionamento entre as entidades

A estrutura funcional pode ser representada da seguinte forma:

```text
IMÓVEL
  │
  └── possui vários MEDIDORES
          │
          └── possui várias LEITURAS
```

Ou, em termos de relacionamento:

```text
Imóvel 1 ───────── N Medidores
                      │
                      │
                      └──────── N Leituras
```

### Imóvel

Representa a propriedade onde os medidores estão instalados.

Principais dados:

```text
id
nome
endereco
```

### Medidor

Representa o equipamento responsável pelas medições e está associado a um imóvel.

Principais dados:

```text
id
identificador
tipo
imovelId
```

### Leitura

Representa uma medição acumulada registrada para um medidor.

Principais dados:

```text
id
dataHora
valor
medidorId
```

---

# 7. Fluxo de utilização

Um fluxo típico da API pode seguir esta sequência:

```text
1. Cadastrar um imóvel
        ↓
2. Cadastrar um medidor vinculado ao imóvel
        ↓
3. Registrar leituras para o medidor
        ↓
4. Consultar o histórico de leituras
        ↓
5. Consultar o consumo agregado
        ↓
6. Utilizar os dados para gerar gráficos no Angular
```

Exemplo:

```text
POST /imoveis
        ↓
POST /medidores
        ↓
POST /leituras
        ↓
POST /leituras
        ↓
POST /leituras
        ↓
GET /medidores/:id/consumo?nivel=dia&ano=2026&mes=9
        ↓
Angular
        ↓
Gráfico de consumo
```

---

# 8. Formato dos dados para gráficos

O endpoint de consumo retorna dados no formato:

```json
[
  {
    "name": "1",
    "value": 15.2
  },
  {
    "name": "2",
    "value": 20.8
  },
  {
    "name": "3",
    "value": 12.0
  }
]
```

Esse formato permite que o frontend Angular utilize diretamente os campos `name` e `value` para construir gráficos.

A interpretação de `name` depende do parâmetro `nivel`:

| `nivel` | `name` representa |
|---------|-------------------|
|  `dia`  |    Dia do mês     |
|  `mes`  |   Número do mês   |
|  `ano`  |        Ano        |

O campo `value` representa o consumo calculado para o respectivo período.

---

# 9. Exemplos de URLs

Considerando a API executando localmente na porta `3000`:

### Listar imóveis

```text
GET http://localhost:3000/imoveis
```

### Buscar imóvel

```text
GET http://localhost:3000/imoveis/{id}
```

### Listar medidores

```text
GET http://localhost:3000/medidores
```

### Buscar medidor

```text
GET http://localhost:3000/medidores/{id}
```

### Listar leituras

```text
GET http://localhost:3000/leituras
```

### Buscar leitura

```text
GET http://localhost:3000/leituras/{id}
```

### Consumo diário

```text
GET http://localhost:3000/medidores/{id}/consumo?nivel=dia&ano=2026&mes=9
```

### Consumo mensal

```text
GET http://localhost:3000/medidores/{id}/consumo?nivel=mes&ano=2026
```

### Consumo anual

```text
GET http://localhost:3000/medidores/{id}/consumo?nivel=ano
```

---

# 10. Observações importantes

1. O `id` do imóvel deve ser utilizado em `imovelId` ao cadastrar um medidor.

2. O `id` do medidor deve ser utilizado em `medidorId` ao registrar uma leitura.

3. As leituras são acumuladas, no conceito de odômetro. O consumo é obtido pela diferença entre leituras consecutivas.

4. O endpoint `/medidores/:id/consumo` transforma as diferenças calculadas em dados agrupados para consumo diário, mensal ou anual.

5. O parâmetro `nivel` é obrigatório no endpoint de consumo e aceita somente `ano`, `mes` ou `dia`, conforme a especificação.

6. Para o agrupamento diário, são utilizados `ano` e `mes` para definir o período consultado.

7. Para o agrupamento mensal, o parâmetro `ano` define o ano consultado.

8. Para o agrupamento anual, não é necessário informar `ano` ou `mes`.

9. A exclusão de um medidor remove também suas leituras vinculadas em cascata.

10. Os exemplos de UUID e valores apresentados nesta documentação são exemplos e devem ser substituídos pelos valores reais retornados pela API.

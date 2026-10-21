# Projeto-QA-S07

Projeto de QA automatizado utilizando [Cypress](https://www.cypress.io/) para testar a aplicação **Weather Now**, desenvolvida por um colega.

## 🌦️ Sobre a aplicação testada

O **Weather Now** é uma aplicação que permite buscar a previsão do tempo de qualquer cidade do mundo, exibindo:

- Temperatura atual
- Condição do tempo (ex: Overcast Clouds)
- Umidade
- Velocidade do vento
- Data e hora da consulta

Os dados são fornecidos pela API do [OpenWeather](https://openweathermap.org/).

## 🛠️ Tecnologias

- [Cypress](https://www.cypress.io/) — framework de testes end-to-end (E2E)
- [Allure Report](https://allurereport.org/) (`allure-cypress`) — relatórios de testes com histórico e tendências
- [Jenkins](https://www.jenkins.io/) — pipeline de CI/CD
- [Docker](https://www.docker.com/) / Docker Compose — containers do ambiente
- Node.js / npm

## 📁 Estrutura do projeto

```
Projeto-QA-S07/
├── cypress/
│   ├── e2e/
│   │   └── weather-now-tests/       # Testes automatizados da aplicação Weather Now (TC-001 a TC-020)
│   ├── cypress-examples-tests/      # Exemplos de referência do Cypress (não são executados)
│   ├── fixtures/                    # Dados mockados usados nos testes
│   └── support/                     # Comandos customizados e configurações globais
├── allure-results/                  # Resultados brutos do Allure gerados a cada execução (não versionado)
├── cypress.config.js                # Configuração do Cypress (baseUrl, timeouts, viewport, reporter etc.)
├── docker-compose.yml               # Containers: app, cypress, jenkins, allure e portainer
├── dockerfile.app                   # Imagem da aplicação Weather Now
├── dockerfile.cypress               # Imagem com os testes Cypress
├── dockerfile.jenkins               # Imagem do Jenkins com Docker CLI e plugins
├── Jenkinsfile                      # Pipeline de CI/CD
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18+ recomendada)
- A aplicação **Weather Now** rodando localmente em `http://localhost:3000/`

## 🚀 Como rodar o projeto

1. Clone este repositório:
```bash
git clone <url-do-repositorio>
cd Projeto-QA-S07
```

2. Instale as dependências:
```bash
npm install
```

3. Certifique-se de que a aplicação **Weather Now** está rodando em `http://localhost:3000/`.

4. Rode os testes:

**Modo interativo (interface gráfica):**
```bash
npx cypress open
```

**Modo headless (via terminal, gera vídeos automaticamente):**
```bash
npx cypress run
```

## 📊 Relatório de testes

O projeto usa o [Allure Report](https://allurereport.org/) (`allure-cypress`). Cada execução grava os resultados em `allure-results/`, e o container `allure` gera o relatório mantendo o histórico das últimas execuções (tendências, testes instáveis e screenshots de falhas).

Com os containers rodando, o relatório fica em:
```
http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html
```

## 🐳 Containers

| Container | Porta | Função |
|-----------|-------|--------|
| `app` | 3000 | Aplicação Weather Now |
| `cypress` | — | Executa os testes E2E (perfil `test`) |
| `jenkins` | 8080 | Pipeline de CI/CD (visualização em *Pipeline Graph View*) |
| `allure` | 5050 | Relatórios de testes com histórico |
| `portainer` | 9443 | Interface web para gerenciar os containers (`https://localhost:9443`) |

```bash
docker compose up -d                      # sobe app, jenkins, allure e portainer
docker compose --profile test run cypress # executa os testes
curl "http://localhost:5050/allure-docker-service/generate-report?project_id=default"
```

No Jenkins, cadastre a credencial **Secret text** `openweather-api-key` com a chave da API do OpenWeather.

## 🎥 Vídeos e screenshots

O Cypress gera automaticamente:
- Vídeos de todas as execuções em `cypress/videos/`
- Screenshots de testes que falharam em `cypress/screenshots/`

Esses arquivos, assim como a pasta `allure-results/`, não são versionados (estão no `.gitignore`), pois são artefatos gerados a cada execução.

## ✅ Casos de teste

Total: **20 casos de teste**.

| ID | Descrição | Status |
|----|-----------|--------|
| TC-001 | Busca por uma cidade seguindo regras gramaticais corretas | ✅ |
| TC-002 | Busca pela mesma cidade do TC-001, em letras maiúsculas | ✅ |
| TC-003 | Busca pela mesma cidade do TC-001, em letras minúsculas | ✅ |
| TC-004 | Busca pela mesma cidade do TC-001, sem acentos | ✅ |
| TC-005 | Comparação de busca em português e inglês (Nova York x New York) | ✅ |
| TC-006 | Busca por uma cidade inexistente — exibe mensagem de erro | ✅ |
| TC-007 | Clicar no botão de busca sem digitar nenhuma cidade | ✅ |
| TC-008 | Busca por cidade com nome composto sem usar espaço | ✅ |
| TC-009 | Busca com caracteres especiais | ✅ |
| TC-010 | Busca somente com números | ✅ |
| TC-011 | Verifica se a página carrega corretamente (título, input, botão, texto) | ✅ |
| TC-012 | Busca por 2 cidades ao mesmo tempo | ✅ |
| TC-013 | Busca pela cidade certa, mas país errado | ✅ |
| TC-014 | Busca com string extremamente longa (análise de valor limite, 300 caracteres) | ✅ |
| TC-015 | Simula erro 500 da API — exibe mensagem de erro amigável ao usuário | ✅ |
| TC-016 | Simula atraso extremo da API — verifica estado de loading e botão desabilitado | ✅ |
| TC-017 | Busca por cidade e país juntos (ex: São Paulo, BR) | ✅ |
| TC-018 | Compara cidades de mesmo nome em países diferentes (La Paz, BO x La Paz, MX) | ✅ |
| TC-019 | Busca acionada pela tecla Enter, sem clicar no botão | ✅ |
| TC-020 | Simula limite de requisições da API excedido (HTTP 429) | ✅ |
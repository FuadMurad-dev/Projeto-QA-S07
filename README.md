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
- [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) — geração de relatórios HTML visuais
- Node.js / npm

## 📁 Estrutura do projeto

```
Projeto-QA-S07/
├── cypress/
│   ├── e2e/
│   │   └── weather-now-tests/       # Testes automatizados da aplicação Weather Now (TC-001 a TC-014)
│   ├── cypress-examples-tests/      # Exemplos de referência do Cypress (não são executados)
│   ├── fixtures/                    # Dados mockados usados nos testes
│   ├── reports/                     # Relatório HTML gerado a cada execução (não versionado)
│   └── support/                     # Comandos customizados e configurações globais
├── cypress.config.js                # Configuração do Cypress (baseUrl, timeouts, viewport, reporter etc.)
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

O projeto usa o `cypress-mochawesome-reporter` para gerar um relatório HTML navegável após cada execução.

Após rodar `npm run open-report`, abra o arquivo:
```
cypress/reports/index.html
```

O relatório mostra o status de cada caso de teste, tempo de execução, código executado e, em caso de falha, screenshot e vídeo anexados automaticamente.

## 🎥 Vídeos e screenshots

O Cypress gera automaticamente:
- Vídeos de todas as execuções em `cypress/videos/`
- Screenshots de testes que falharam em `cypress/screenshots/`

Esses arquivos, assim como a pasta `cypress/reports/`, não são versionados (estão no `.gitignore`), pois são artefatos gerados a cada execução.

## ✅ Casos de teste

Última execução: **14/14 testes passando (100%)**.

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
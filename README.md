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
- Node.js / npm

## 📁 Estrutura do projeto

```
Projeto-QA-S07/
├── cypress/
│   ├── e2e/
│   │   └── weather-now-tests/     # Testes automatizados da aplicação Weather Now
│   ├── cypress-examples-tests/    # Exemplos de referência do Cypress (não são executados)
│   ├── fixtures/                  # Dados mockados usados nos testes
│   └── support/                   # Comandos customizados e configurações globais
├── cypress.config.js              # Configuração do Cypress (baseUrl, timeouts, viewport etc.)
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

## 🎥 Vídeos e screenshots

Ao rodar `npx cypress run`, o Cypress gera automaticamente:
- Vídeos de todas as execuções em `cypress/videos/`
- Screenshots de testes que falharam em `cypress/screenshots/`

Esses arquivos não são versionados (estão no `.gitignore`), pois são gerados a cada execução.

## ✅ Casos de teste cobertos

- [ ] Busca de cidade válida exibe os dados do clima corretamente
- [ ] Busca de cidade inexistente exibe mensagem de erro

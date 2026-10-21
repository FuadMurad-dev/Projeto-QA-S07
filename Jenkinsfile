pipeline {
    agent any

    options {
        timeout(time: 20, unit: 'MINUTES')
    }

    environment {
        APP_REPO = "https://github.com/CaioBonvicine/Weather-Now.git"
        // credential do tipo "Secret text" cadastrada no Jenkins
        OPENWEATHER_API_KEY = credentials('openweather-api-key')
        // volume compartilhado com o container do Allure (docker-compose.yml)
        ALLURE_RESULTS_VOLUME = "allure-results"
        // o Jenkins acessa o Allure pela rede do docker compose
        ALLURE_URL = "http://allure:5050"
    }

    stages {
        stage('Clone app') {
            steps {
                echo '>>> [1/5] Clonando o repositório da aplicação'
                sh '''
                    rm -rf app-src
                    git clone --depth 1 $APP_REPO app-src
                    echo "--- arquivos ---"
                    ls -la app-src
                    echo "--- scripts do package.json ---"
                    grep -A8 '"scripts"' app-src/package.json
                '''
            }
        }

        stage('Build image Cypress') {
            steps {
                echo '>>> [2/5] Build da imagem do Cypress'
                sh 'docker build -f dockerfile.cypress -t weather-cypress .'
            }
        }

        stage('Build image App') {
            steps {
                echo '>>> [3/5] Build da imagem da aplicação'
                // o build (npm run build) acontece dentro do dockerfile.app
                sh 'docker build -f dockerfile.app -t weather-app ./app-src'
            }
        }

        stage('Run app') {
            steps {
                echo '>>> [4/5] Subindo a aplicação'
                sh '''
                    docker rm -f weather-app cypress-run || true
                    docker network create qa-net || true
                    docker run -d --name weather-app --network qa-net \
                        -e OPENWEATHER_API_KEY \
                        -e HOST=0.0.0.0 \
                        -e PORT=3000 \
                        weather-app

                    for i in $(seq 1 30); do
                        if docker run --rm --network qa-net curlimages/curl -sf http://weather-app:3000 > /dev/null; then
                            echo "App respondendo"; exit 0
                        fi
                        sleep 2
                    done
                    echo "App não subiu a tempo"; docker logs weather-app; exit 1
                '''
            }
        }

        stage('Run tests') {
            steps {
                echo '>>> [5/5] Executando testes Cypress'
                sh '''
                    # limpa os resultados da execução anterior (o histórico fica no Allure)
                    docker run --rm -v $ALLURE_RESULTS_VOLUME:/results alpine sh -c 'rm -rf /results/*'

                    docker run --name cypress-run --network qa-net \
                        -v $ALLURE_RESULTS_VOLUME:/e2e/allure-results \
                        -e CYPRESS_baseUrl=http://weather-app:3000 \
                        -e CYPRESS_API_KEY=$OPENWEATHER_API_KEY \
                        weather-cypress
                '''
            }
        }
    }

    post {
        always {
            echo '>>> Finalizando: gerando relatório Allure e limpando containers'
            sh '''
                curl -sf "$ALLURE_URL/allure-docker-service/generate-report?project_id=default" > /dev/null \
                    && echo "Relatório Allure: http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html" \
                    || echo "Não foi possível gerar o relatório Allure (container 'allure' está rodando?)"
            '''
            sh 'docker rm -f cypress-run weather-app || true'
        }
    }
}

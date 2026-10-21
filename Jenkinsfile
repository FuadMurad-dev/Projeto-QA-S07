pipeline {
    agent any

    options {
        timeout(time: 20, unit: 'MINUTES')
    }

    environment {
        APP_REPO = "https://github.com/CaioBonvicine/Weather-Now.git"
    }

    stages {
        stage('Clone app') {
            steps {
                echo '>>> [1/5] Clonando o repositório da aplicação'
                sh '''
                    rm -rf app-src
                    git clone --depth 1 $APP_REPO app-src
                    ls app-src
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
                sh 'docker build -f dockerfile.app -t weather-app ./app-src'
            }
        }

        stage('Run app') {
            steps {
                echo '>>> [4/5] Subindo a aplicação'
                sh '''
                    docker rm -f weather-app cypress-run || true
                    docker network create qa-net || true
                    docker run -d --name weather-app --network qa-net weather-app

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
                    docker run --name cypress-run --network qa-net \
                        -e CYPRESS_baseUrl=http://weather-app:3000 \
                        weather-cypress
                '''
            }
        }
    }

    post {
        always {
            echo '>>> Finalizando: coletando relatório e limpando containers'
            sh 'docker cp cypress-run:/e2e/cypress/reports ./reports || true'
            publishHTML(target: [
                reportDir: 'reports',
                reportFiles: 'index.html',
                reportName: 'Cypress Report',
                allowMissing: true
            ])
            sh 'docker rm -f cypress-run weather-app || true'
        }
    }
}
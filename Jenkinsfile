pipeline {
    agent any

    stages {
        stage('Clone app') {
            steps {
                sh '''
                rm -rf app-src
                git clone https://github.com/CaioBonvicine/Weather-Now.git app-src
                '''
    }
}
        stage('Build image Cypress') {
            steps {
                echo '>>> [1/4] Iniciando: build da imagem do Cypress'
                sh 'docker build -f dockerfile.cypress -t weather-cypress .'
            }
        }

        stage('Build image App') {
            steps {
                echo '>>> [2/4] Iniciando: build da imagem da aplicação'
                sh 'docker build -f dockerfile.app -t weather-app .'
            }
        }

        stage('Run app') {
            steps {
                echo '>>> [3/4] Iniciando: subida da aplicação'
                sh '''
                    docker rm -f weather-app cypress-run || true
                    docker network create qa-net || true
                    docker run -d --name weather-app --network qa-net weather-app
                    sleep 20
                '''
            }
        }

        stage('Run tests') {
            steps {
                echo '>>> [4/4] Iniciando: execução dos testes Cypress'
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
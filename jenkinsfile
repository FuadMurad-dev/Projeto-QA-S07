pipeline{
    agente any 
    stages{
        stage('Build image dockerfile'){
            steps{
                echo 'Building image dockerfile'
                sh 'docker build -f Dockerfile.cypress -t weather-cypress .'
            }
        }
    }
    stage('Run image dockerfile'){
        steps{
            '''
            echo 'Running image dockerfile'
          docker network create qa-net || true
          docker run -d --name weather-app --network qa-net <imagem-ou-build-da-app>
        '''
        }
    }
    stage('run tests'){
        steps{
            sh '''
            echo 'Running tests'
            docker run --name cypress-run --network qa-net \
            -e CYPRESS_baseUrl=http://weather-app:3000 \
            weather-cypress
        '''
        }
    }
    post {
        always {
            sh 'docker cp cypress-run:/e2e/cypress/reports ./reports || true'
            publishHTML(target: [reportDir: 'reports', reportFiles: 'index.html', reportName: 'Cypress Report'])
            sh 'docker rm -f cypress-run weather-app || true'
        }
    }
}
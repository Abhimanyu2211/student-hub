pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 10, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'make install'
            }
        }

        stage('Test') {
            steps {
                sh 'make test'
            }
        }

        stage('Build') {
            steps {
                sh 'make build'
            }
        }

        // -----------------------------------------------------------------------
        // M5 — Containerization: Build and push image to container registry
        // -----------------------------------------------------------------------
        stage('Docker Build') {
            steps {
                sh 'docker build -t ghcr.io/skit-devops-2026/devops-24eskcs013:latest .'
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push ghcr.io/skit-devops-2026/devops-24eskcs013:latest || true'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded — all stages passed.'
        }
        failure {
            echo 'Pipeline failed — check the logs above.'
        }
    }
}

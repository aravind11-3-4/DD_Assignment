🚀 MEAN Stack Application with CI/CD Pipeline
📌 Project Overview

This project demonstrates a full DevOps workflow for deploying a MEAN stack application using:

Docker & Docker Compose

Docker Hub

AWS EC2 (Ubuntu)

Nginx (Reverse Proxy)

GitHub Actions CI/CD Pipeline

The pipeline automatically builds, pushes, and deploys the application whenever changes are pushed to the main branch.

🏗️ Architecture Overview
Developer → GitHub → GitHub Actions → Docker Hub → AWS EC2 → Nginx → Users
⚙️ Tech Stack

MongoDB

Express.js

Angular

Node.js

Docker

Docker Compose

GitHub Actions

AWS EC2 (Ubuntu 24.04)

Nginx

🖥️ Infrastructure Setup
1️⃣ AWS EC2 Setup

Launched Ubuntu EC2 instance

Opened ports:

22 (SSH)

80 (HTTP)

443 (HTTPS – optional)

Connect to Server
<img width="1919" height="1024" alt="Screenshot 2026-02-24 160454" src="https://github.com/user-attachments/assets/b02b315a-b773-4334-bb1d-ae1664aaf38e" />

chmod 400 mean-key.pem
ssh -i mean-key.pem ubuntu@YOUR_PUBLIC_IP
🐳 Docker Installation (On EC2)
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu
<img width="1919" height="973" alt="Screenshot 2026-02-24 193559" src="https://github.com/user-attachments/assets/b36f9dfe-9d74-4ba1-884d-95197b22a2aa" />


Logout and reconnect to apply permissions.

🗄️ Database Setup

Option used in this project:
<img width="1919" height="1079" alt="Screenshot 2026-02-24 200517" src="https://github.com/user-attachments/assets/3ce4cf5e-2437-493d-97c6-53d4a9a149de" />

✅ MongoDB via Docker (recommended)

Docker Compose handles MongoDB container automatically.

📦 Docker Setup
Build Docker Image (Locally)
docker build -t yourdockerhubusername/mean-app:latest .
Push to Docker Hub
docker login
docker push aravind1134/mean-app:latest
<img width="1919" height="1025" alt="image" src="https://github.com/user-attachments/assets/172dd653-e47d-418a-a2ba-4cc9bfaba7eb" />

📂 docker-compose.yml (On EC2)
version: '3'

services:
  app:
    image: yourdockerhubusername/mean-app:latest
    ports:
      - "80:3000"
    restart: always

Run:

docker-compose up -d
🔁 CI/CD Pipeline (GitHub Actions)
Workflow File Location
.github/workflows/deploy.yml
Pipeline Steps

Checkout repository

Build Docker image

Push image to Docker Hub

SSH into EC2

Pull latest image

Restart containers

Required GitHub Secrets
Secret Name	Description
DOCKERHUB_USERNAME	Docker Hub username
DOCKERHUB_TOKEN	Docker Hub access token
VM_HOST	EC2 public IP
VM_USER	ubuntu
SSH_PRIVATE_KEY	EC2 private key


1️⃣ CI/CD Configuration

![CI/CD Workflow](screenshots/github-actions-workflow.png)
2️⃣ Docker Image Build & Push

<img width="1919" height="1025" alt="image" src="https://github.com/user-attachments/assets/6031e031-8202-45a6-845f-c08b4d209486" />

3️⃣ GitHub Actions Execution

![Pipeline Success](screenshots/pipeline-success.png)
4️⃣ Application Running on EC2

<img width="1919" height="1079" alt="Screenshot 2026-02-24 195116" src="https://github.com/user-attachments/assets/2bb30444-b6fa-436a-81bf-3dc9b530afad" />

5️⃣ Nginx Configuration


🧪 Testing the Deployment

Open browser:

http://56.288.28.13

Application should load successfully.

📊 Verification Commands

Check running containers:

docker ps

Check logs:

docker-compose logs

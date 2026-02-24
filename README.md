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
docker push yourdockerhubusername/mean-app:latest
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
🌐 Nginx Setup (Reverse Proxy)

Install Nginx:

sudo apt install nginx -y

Edit config:

sudo nano /etc/nginx/sites-available/default

Example configuration:

server {
    listen 80;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

Restart Nginx:

sudo systemctl restart nginx
🚀 Deployment Flow

When code is pushed to main branch:

GitHub Actions builds Docker image

Image pushed to Docker Hub

SSH into EC2

Pull latest image

Restart docker-compose

Application updates automatically

📸 Screenshots
1️⃣ CI/CD Configuration

Add screenshot here

![CI/CD Workflow](screenshots/github-actions-workflow.png)
2️⃣ Docker Image Build & Push




![Docker Build](screenshots/docker-build.png)
3️⃣ GitHub Actions Execution

Add screenshot here

![Pipeline Success](screenshots/pipeline-success.png)
4️⃣ Application Running on EC2

Add screenshot here

![App UI](screenshots/app-ui.png)
5️⃣ Nginx Configuration

Add screenshot here

![Nginx Setup](screenshots/nginx-config.png)
🧪 Testing the Deployment

Open browser:

http://56.288.28.13

Application should load successfully.

📊 Verification Commands

Check running containers:

docker ps

Check logs:

docker-compose logs

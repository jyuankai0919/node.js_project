# 使用Microsoft的universal基礎映像
FROM mcr.microsoft.com/devcontainers/universal:2

# 安裝Redis
RUN apt-get update && apt-get install -y redis-server

# 安裝HCP-CLI
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
RUN sudo apt update && sudo apt install vlt -y


# ShopFlow E-Commerce - Microsserviços e Arquitetura em Nuvem

Projeto desenvolvido para a avaliação final de arquitetura em nuvem, implementando uma aplicação de e-commerce baseada em microsserviços conteinerizados e hospedada em uma instância AWS EC2.

---

## 🏗️ Arquitetura do Sistema (3 Camadas)

1. **Camada de Apresentação (Frontend):** 
   - Desenvolvida em **React (Vite)** e servida em produção através de um servidor **Nginx** otimizado em container Docker.
2. **Camada de Aplicação / API (Backend):**
   - Microsserviços orientados a API para gestão de pedidos e catálogo.
3. **Camada de Persistência (Banco de Dados):**
   - **PostgreSQL 15 (Alpine)** rodando em container isolado, com inicialização automatizada de esquemas via scripts SQL (`init.sql`).

---

## 🚀 Como Executar o Projeto na EC2

Certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua instância Ubuntu.

### 1. Iniciar os Serviços
Na raiz do projeto onde se encontra o `docker-compose.yml`, execute:
```bash
docker compose up -d --build

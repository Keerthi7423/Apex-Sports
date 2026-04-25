# Apex Sports Intelligence Platform

A high-performance sports analytics platform built with a microservices architecture.

## Architecture

- **Frontend**: Next.js 14 (Web) & Flutter (Mobile)
- **API Gateway**: Express.js proxying all requests.
- **Microservices**:
  - `match-service`: Real-time scores and stats.
  - `player-service`: Player profiles and CSPI engine.
  - `ai-service`: Ollama (Local LLM) integration.
  - `user-service`: Auth and preferences.
  - `notification-service`: Firebase Cloud Messaging.
- **Database**: MongoDB & Firebase.
- **AI**: Ollama (Llama 3.2).

## Tech Stack Highlights

- **Monorepo**: Managed with npm workspaces.
- **Communication**: HTTP Proxying + Redis Pub/Sub for event-driven updates.
- **AI**: Self-hosted local LLMs for data privacy and zero cost.

## Setup

1. Install dependencies: `npm install`
2. Configure `.env` file.
3. Start development: `npm run dev`

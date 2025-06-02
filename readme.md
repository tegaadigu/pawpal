# 🐾 PawPal
### Love your dog, elevate their care.

PawPal is an all-in-one platform for modern pet parents. We bring together the best of **premium fresh dog food**, a **pet-loving social community**, and smart **remote collar control** — all in one seamless mobile and web experience.

## 🚀 Vision

PawPal is building the future of pet care:

- **Fresh Food Marketplace**  
  Curated storefront with top-tier fresh dog food brands like The Farmer's Dog, Ollie, NutriCanine, and more — giving pet parents flexible choices, subscriptions, and local options.

- **Pet Parent Community**  
  A vibrant app-based social space for sharing moments, reviews, tips, and events. Designed to foster real emotional engagement among pet owners.

- **Smart Training Integration**  
  Remote e-collar control and pet management via the PawPal app. Control vibration, sound, or location features directly from your smartphone (planned hardware roadmap).

## 🧱 Monorepo Structure (Todo)


  

## 📦 Tech Stack

- **Frontend:** React, Flutter, Next.js, Tailwind, ShadCN
- **Backend:** Node.js (Fastify), PostgreSQL, Redis, OpenAPI
- **Infra:** Docker, Kubernetes, AWS S3, CloudFront, GitHub Actions
- **Mobile & IoT:** Planned Bluetooth + API bridge for smart collar control

## 🛠 Getting Started

Before installing pawpal - make sure you have the below installed

1. nvm - [node version manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

2. docker - [container manger](https://docs.docker.com/compose/install/)

3. Rush - [Mono repo version manager](https://rushjs.io/pages/intro/get_started/)

4. pnpm - [Dependency manager](https://pnpm.io/installation)

```bash
# Clone the repo
git clone https://github.com/tegaadigu/pawpal.git
cd pawpal
```

## 🧰 Backend / Microservices

To get started with the microservice, ensure that your environment variable is configured using the example found in `.env.example` - otherwise run the below command to create a new `.env` from your `.env.example` file.

***Note***: This action is not reversible, if you have already filled out your .env file skip this step.

```bash
# from the root folder
# Install all micro-service dependencies
pnpm run install:services:dependencies

# Create .env file based on .env.example across micro-services.
pnpm run update:services:env

# Note: The pawpal services uses a pub/sub mechanism for distributing event across micro-services - you need to first create a shared docker network for containers to have access to kafka.

docker network create pawpal-net

# Verify that the network has been created

docker network ls | grep pawpal-net

# you should see something similar to 
# b14543fb71c5   pawpal-net                bridge    local

# Start all services with docker (datbase and micro-service)
pnpm run start:services:docker

# Run database migration for all micro services
pnpm run migrate:services
```


### Create New Microservice

to create a new backend service run the below command from the root folder

```bash
#from project root folder

pnpm run create:service
 
#follow the prompt.
# On success run the previous command for installing all micro-service dependencies
# verify that your new project exists in rush.json of the project_type (services or web)/rush.json
pnpm run update:services:env

# Install dependencies to update rush
pnpm run install:services:dependencies


# Start all services with docker (datbase and micro-service)
pnpm run start:services:docker

# This should include your new service.
```
***Note***: At the moment only restful service template is supported. Pending event-driven

## 🖥️ Web 




## 📱 Mobile (Todo)

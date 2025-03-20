# Use the official Node.js image with version 20.14.0
FROM node:20.14.0

RUN npm install -g pnpm@9.15.4

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package.json pnpm-workspace.yaml ./

COPY packages/pawpal-store/package.json ./packages/pawpal-store/

# Copy shared utils

COPY packages/pawpal-shared/package.json ./packages/pawpal-shared/

COPY packages/pawpal-shared/ ./packages/pawpal-shared/

RUN pnpm install 

# # COPY Rest of sub-apps
COPY packages/pawpal-store/  ./packages/pawpal-store/



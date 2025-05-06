# Use the official Node.js image with version 20.14.0
FROM node:20.14.0

RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .
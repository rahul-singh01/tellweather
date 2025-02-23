# Dockerfile for package.json

# Use the official Node.js image as the base image
# This will serve as the build environment
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Use a smaller image for the final stage
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the installed dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the application code from the build stage
COPY --from=build /app .

# Expose the port that the application runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
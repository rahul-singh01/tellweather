# Dockerfile for package.json

# Use the official Node.js image as the base image
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use the official Node.js image as the runtime image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the built application code from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
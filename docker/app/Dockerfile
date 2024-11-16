# Stage 0: Install the application dependencies
FROM node:22-alpine AS intaller

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

COPY --from=intaller /app/node_modules ./node_modules

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

###############################################################################
# Stage 2: Create the production image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/doc ./doc

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start:prod"]
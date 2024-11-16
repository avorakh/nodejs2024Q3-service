# Stage 0: Install the application dependencies
FROM node:22-alpine AS intaller

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
###############################################################################
# Stage 1: Create the development image
FROM node:22-alpine AS development

# Set the working directory inside the container
WORKDIR /app

COPY --from=intaller /app/node_modules ./node_modules

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application in development mode
CMD ["npm", "run", "start:dev"]
# Base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (optional, if you're using Docker Compose or directly running the container)
EXPOSE 4000

# Start the app in development mode
CMD ["npm", "run", "dev"]

# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the app runs on
EXPOSE 8000

# Set the environment variables file
ENV NODE_ENV=production

# Define the command to run the application
CMD ["node", "dist/server.js"]

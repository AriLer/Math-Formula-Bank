# Use a specific version of the Node.js image based on Alpine Linux
FROM node:21.5-alpine

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the current directory contents into the container at /var/www/html
COPY . .

# Remove the .next directory to ensure a fresh build
RUN rm -rf /var/www/html/.next

# Install project dependencies using npm ci, which provides a more stable and reproducible build
RUN npm ci

# Build the Next.js application
RUN npm run build

# Expose port 8080 for the application
EXPOSE 8080

# Set the command to start the Node.js application
CMD ["npm", "start"]

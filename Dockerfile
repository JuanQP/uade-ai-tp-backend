FROM node:18-alpine

# Install backend dependencies
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install

# Add source code and build
COPY . .
RUN npm run build

# Start the app 🎉
CMD [ "sh", "-c", "npm start" ]

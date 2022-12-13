# Frontend build stage ----------
FROM uade-ai-tp:1.0.0 as build
RUN npm run build

# Backend build stage ----------
FROM node:18-alpine
# Copy built frontend to backend
WORKDIR /app
COPY --from=build /app/dist /app/frontend-dist
# Install dependencies
COPY package*.json tsconfig.json ./
RUN npm install
# Add source code and build
COPY . .
RUN npm run build

# Start the app 🎉
CMD [ "sh", "-c", "npm start" ]

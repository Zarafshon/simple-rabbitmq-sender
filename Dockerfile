# Stage 1: Build the application
FROM node:16 as build

WORKDIR /app

COPY package.json ./

# RUN npm install --unsafe-perm --ignore-scripts=false --foreground-scripts --verbose sharp@0.32.0

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/.production.env ./

CMD ["npm", "start"]
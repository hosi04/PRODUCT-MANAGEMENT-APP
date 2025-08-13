# # Stage 1: Build ứng dụng React
# FROM node:20-alpine AS build_stage

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# # Stage 2: Serve ứng dụng đã build bằng Nginx
# FROM nginx:stable-alpine

# COPY --from=build_stage /app/dist /usr/share/nginx/html
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Copy file requirements.txt và cài đặt các dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build ứng dụng React
FROM node:20-alpine AS build_stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve ứng dụng đã build bằng Nginx
FROM nginx:stable-alpine

COPY --from=build_stage /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 1 - react build
# FROM node:alpine as react-build
# WORKDIR /app
# COPY package*.json /app/
# RUN npm install
# COPY ./ /app/
# RUN npm run build

# Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=react-build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
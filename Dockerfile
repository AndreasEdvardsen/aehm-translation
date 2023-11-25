FROM oven/bun:latest

# install simple http server for serving static content
RUN bun install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN bun install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN npm bun build

EXPOSE 8080
CMD [ "http-server", "dist" ]
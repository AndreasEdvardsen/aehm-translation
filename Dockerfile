# Step 1: Use the oven/bun:latest Docker image for building the project
FROM oven/bun:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and bun.lockb files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of your project
COPY . .

# Build the project (if necessary)
RUN bun run build

# Step 2: Use the oven/bun:latest Docker image for the runtime environment
FROM oven/bun:alpine

WORKDIR /app

# Copy the build from the previous stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the app with the compiled .mjs file
CMD ["bun", "./.output/server/index.mjs"]

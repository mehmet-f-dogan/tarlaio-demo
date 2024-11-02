# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17-slim AS builder

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Generate keys (This step is optional if you want to do it during build)
#RUN openssl genrsa -out src/main/resources/app.key 2048 && \
#    openssl rsa -in src/main/resources/app.key -pubout -out src/main/resources/app.pub

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Create the final image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Copy the wait-for-it script (make sure to have this script in your project)
#COPY wait-for-it.sh /usr/local/bin/wait-for-it
#RUN chmod +x /usr/local/bin/wait-for-it

# Set the entry point to wait for PostgreSQL and run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Expose the application port (replace with your app's port)
EXPOSE 8080

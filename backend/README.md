# Launching the API locally
* Create a postgresql docker container `docker-compose up -d`
* `./mvnw clean flyway:migrate -D"flyway.configFiles"="flywayConfig.conf"` to run migrations
* Run the application
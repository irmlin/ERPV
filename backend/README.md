# Launching the API locally
* Create a postgresql docker container `docker-compose up -d`
* `./mvnw clean flyway:migrate -D"flyway.configFiles"="flywayConfig.conf"` to run migrations
* Run the application

If trying to run updated migrations, run `./mvnw flyway:clean -D"flyway.configFiles"="flywayConfig.conf"`
to delete old migrations
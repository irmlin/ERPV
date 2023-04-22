# Launching the API locally (both Spring Boot and Fast API (python))
* Put [object detection model](https://drive.google.com/file/d/1M19b2kqiyyekrYv8H13plyp04aqCnLGt/view?usp=share_link) in ERPV/computer_vision_api/models
* Follow [instructions](https://erpv.atlassian.net/browse/ERPV-75) to open ports for both API's
* Create a postgresql docker container, this also creates python API container and runs it `docker-compose up -d`
* `./mvnw clean flyway:migrate -D"flyway.configFiles"="flywayConfig.conf"` to run migrations
* Run the application
* When you're done, remove the containers `docker-compose down` (better to remove, otherwise python API will be running in the background)

If trying to run updated migrations, run `./mvnw flyway:clean -D"flyway.configFiles"="flywayConfig.conf"`
to delete old migrations

# Launching the API locally
* Create a postgresql docker container `docker-compose up -d`
* `./mvnw clean flyway:migrate -D"flyway.configFiles"="flywayConfig.conf"` to run migrations
* Run the application

If trying to run updated migrations, run `./mvnw flyway:clean -D"flyway.configFiles"="flywayConfig.conf"`
to delete old migrations

# Documentation

## Authentication

### `POST` `localhost:8080/api/auth/register`

#### Input

```json
{
    "email": "email@email.com",
    "username": "foobar",
    "password": "password"
}
```

#### Output

```json
{
  "message": "User registered successfully!"
}
```

### `POST` `localhost:8080/api/auth/login`

#### Input

```json
{
    "username": "foobar",
    "password": "password"
}
```

#### Output

```json
{
  "id": 1,
  "username": "foobar",
  "email": "email@email.com"
}
```

## User

### `GET` `localhost:8080/api/user`

#### Output

```json
{
  "fullName": null,
  "totalAmountOfPoints": 0,
  "currentPoints": 0,
  "amountOfAvatars": 0,
  "amountOfScannedPackages": 0,
  "scannedPlastic": 0,
  "scannedPaper": 0,
  "scannedGlass": 0,
  "scannedNonRecyclables": 0,
  "amountOfQuestions": 0,
  "amountOfTries": 0,
  "correctAnswers": 0,
  "amountOfVictories": 0,
  "quizStreak": 0
}
```

### `PUT` `localhost:8080/api/user`

#### Input

```json
{
  "fullName": "John Doe"
}
```

#### Output

```json
{
  "fullName": "John Doe",
  "totalAmountOfPoints": 0,
  "currentPoints": 0,
  "amountOfAvatars": 0,
  "amountOfScannedPackages": 0,
  "scannedPlastic": 0,
  "scannedPaper": 0,
  "scannedGlass": 0,
  "scannedNonRecyclables": 0,
  "amountOfQuestions": 0,
  "amountOfTries": 0,
  "correctAnswers": 0,
  "amountOfVictories": 0,
  "quizStreak": 0
}
```

## Questions

### `GET` `localhost:8080/api/questions`

#### Output

```json
[
  {
    "question": "Į kokios spalvos konteinerį reikia mesti kartoninius pieno pakelius?",
    "options": [
      "Geltonos (plastiko)",
      "Žalios (stiklo)",
      "Mėlynos (popieriaus)"
    ],
    "correctOption": [
      "Geltonos (plastiko)"
    ],
    "explanation": "Kartonines atliekas reikia mesti į plastikui skirtus geltonos spalvos konteinerius."
  },
  ...
]
```
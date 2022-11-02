<h1>BestChatEver</h1>

## Description

BestChatEver, what more you need?

## Installation

```bash
$ npm install

$ cp ./conf/default.env ./conf/.env
```

Add secrets for
```
JWT_ACCESS_TOKEN_SECRET
JWT_REFRESH_TOKEN_SECRET
```

For example you can use this command to generate secret
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
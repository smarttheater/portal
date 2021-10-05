# smart-theater-portal

# Usage

## Environment variables

| Name                               | Required | Value                         | Purpose              |
| ---------------------------------- | -------- | ----------------------------- | -------------------- |
| `NODE_ENV`                         | true     | development, test, production | environment name     |
| `REDIS_HOST`                       | true     |                               | redis host           |
| `REDIS_PORT`                       | true     |                               | redis port           |
| `REDIS_KEY`                        | true     |                               | redis key            |
| `REDIS_TLS_SERVERNAME`             | true     |                               | redis tls servername |
| `STORAGE_URL`                      | true     |                               | storage url          |
| `COMMON_STORAGE_URL`               | true     |                               | common storage url   |
| `API_ENDPOINT`                     | true     |                               | api endpoint         |
| `AUTHORIZATION_CODE_CLIENT_ID`     | true     |                               | client id oauth2     |
| `AUTHORIZATION_CODE_CLIENT_SECRET` | true     |                               | client secret oauth2 |
| `AUTHORIZATION_CODE_DOMAIN`        | true     |                               | oauth2 server domain |
| `TRANSACTION_URL`                  | true     |                               | transaction url      |
| `DEBUG`                            | false    |                               | debug                |

# Valorant Checker

This is a web application to gather information about your daily Valorant store. You can visit the demo at https://valorant.thomasdissert.com/

## Installation

### Requirements

You need a local redis server running on your machine. You can install it with the following command:

```bash
sudo apt install redis-server
```

For local development, you need to install the dependencies with `yarn install` and then run the development server with `yarn dev`.
You need to set your local `.env.development` file with the following variables:

```bash
REDIS_URL=redis://localhost:6379
BASE_URL=http://localhost:3000
```

##  CI

A runtime agnostic docker image is generated using Github Actions. You can run it using the provided docker-compose file (change the REDIS_URL and BASE_URL if necessary).

## Deployment

It is currently deployed in my homelab running on a docker container. You can find the dockerfile and docker-compose.yml in the repository.
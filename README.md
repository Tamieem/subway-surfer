<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Bless this open-source tool that provided a good skeleton with CRUD entry points for this REST API project that I, Tamieem Jaffary, have created myself.

This is my first time ever using TypeScript for a project for the record. I learned everything I've done for this project while I was doing it.
So apologies if my instructions are not thorough or incorrect. I tried to make a dockerized container with all of my necessary files and image configurations.

My Task was to model the subway system 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# First must build docker volume
$ docker-compose up

# development
$ npm start

```

## Current Endpoints
These endpoints were hosted on localhost:3000 for me. I'm going to make the assumption that it will be the same when it is tested.

```
POST /train-line -- Creates A train with its listed stations
stations - each station (or stop) on the train line
name - of the train line
fare - The cost of taking this train

POST /train-line
{
"stations": ["Canal", "Houston", "Christopher", "14th"],
"name": "1"
"fare": 2.75
}



GET /ride/[originStation]/[destinationStation]  -- Returns the optimal station list from the origin station to the destination station


POST /card -- Creates/Updates a Debit Card in the database with a balance 
number - The Card number to create/update
balance - the amount to add on to the card
{
"number": "1234",
"balance": 10.0
}

To Simulate a Ride:

POST /ride/[station]/enter
POST /ride/[station]/exit

```

I have also included my Postman collection, "Subway Surfer.postman_collections.json" which I used to test the required endpoints in the project as a reference if necessary.


## If You've Made It This Far

I'd like to take this moment in my Readme to thank you guys for looking into my project. It was challenging
but also fun and exciting.
It motivated me to build something robust and substantial like this and practice my genuine software engineering skills.

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

## Installation

```bash
$ npm install
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
##More
//netstat -ano|findstr "PID :3000" 
// Proto Local Address Foreign Address State PID 
// TCP 0.0.0.0:3000 0.0.0.0:0 LISTENING 18264
// To kill this process (the /f is force):
// taskkill /pid 18264 /f

## migrations
npx typeorm migration:create src/migrations/TeaRefactor

/* RUNNING MIGRATIONS */

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */
 
// Compile project first 
npm run build

// Run migration(s) 
npx typeorm migration:run -d dist/typeorm-cli.config

// REVERT migration(s)
npx typeorm migration:revert -d dist/typeorm-cli.config

// Let TypeOrm generate migrations (for you)
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config

//advanced use-cases where we might need Custom Providers:
* Creating a custom instance of our provider instead of having Nest instantiate the class for us
* Or let’s say we want to reuse an existing class in a second dependency
* How about if we want to override a class with a mock version for testing
* And lastly, what if we want to use a Strategy Pattern in which we can provide an abstract class and interchange the real implementation (or actual class that is to be used) based on different conditions

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Test
// For unit tests
npm run test 
// Run a unit test for a -specific- file pattern
npm run test:watch -- coffees.service


// For unit tests + collecting testing coverage
npm run test:cov

// For e2e tests
npm run test:e2e

## Stay in touch
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).


## TEST
Unit Tests
For unit tests In NestJS, it’s a common practice to keep the spec files in the same folder as the application source code files that they test. 

Each controller, provider, service, etc. should have its own dedicated test file. The test file extension must be (dot).spec.ts (this is so that integrated test tooling can identify it as a test file with test suites).

End-to-End (e2e) Tests
For e2e tests, these files are typically located in a dedicated `test` directory by default. e2e tests are typically grouped into separate files by the feature or functionality that they test. The file extension must be (dot).e2e-spec.ts. 

How are they different?
While unit tests focus on individual classes and functions…

e2e tests are great for high-level validation of the entire system. e2e testing covers the interaction of classes and modules at a more aggregate level -- closer to the kind of interaction that end-users will have with the production system. 


Grouping our applications functionality into Modules is strongly recommended as an effective way to organize our components. For most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

Because of this encapsulated organization, this allows us to test each feature independently by importing a specific module (that we want to test) into our TestingModule.

In this lesson, we’ll be testing the “Coffees” feature we worked on throughout this course, and test some of the CRUD endpoints we provided in it so far.

💡 IMPORTANT NOTE

Sometimes when errors happen within npm scripts (such as the tests we're running inside test:e2e), post hooks won't run! 

You have a few options here, when these errors happen, you can:

 1) Manually run the `posttest:e2e` hook when Jest errors happen (to make sure your database gets removed)

 2) Use a library like `npm-run-all` (npm i --D npm-run-all) and use the --continue-on-error flag to make sure everything still runs, moving the "post" hook into an npm script to run, like so:

"pretest:e2e": "docker-compose up -d test-db",

"run:jest": "jest --config ./test/jest-e2e.json",

"test:e2e": "npm-run-all the-actual-test run-after-test-even-if-failed --continue-on-error",

"test:e2e:teardown": "docker-compose stop test-db && docker-compose rm -f test-db"
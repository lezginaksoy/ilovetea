import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeesModule } from "src/coffees/coffees.module";

describe('[feature] Coffees - /coffees' ,()=>{
let app:NestApplication;


beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: '1',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');


afterAll(async()=>{
    await app.close();
});



});

// Grouping our applications functionality into Modules is strongly recommended as an effective way to organize our components. For most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

// Because of this encapsulated organization, this allows us to test each feature independently by importing a specific module (that we want to test) into our TestingModule.

// In this lesson, we’ll be testing the “Coffees” feature we worked on throughout this course, and test some of the CRUD endpoints we provided in it so far.

// 💡 IMPORTANT NOTE

// Sometimes when errors happen within npm scripts (such as the tests we're running inside test:e2e), post hooks won't run! 

// You have a few options here, when these errors happen, you can:

//  1) Manually run the `posttest:e2e` hook when Jest errors happen (to make sure your database gets removed)

//  2) Use a library like `npm-run-all` (npm i --D npm-run-all) and use the --continue-on-error flag to make sure everything still runs, moving the "post" hook into an npm script to run, like so:

// "pretest:e2e": "docker-compose up -d test-db",

// "run:jest": "jest --config ./test/jest-e2e.json",

// "test:e2e": "npm-run-all the-actual-test run-after-test-even-if-failed --continue-on-error",

// "test:e2e:teardown": "docker-compose stop test-db && docker-compose rm -f test-db"



 //"pretest:e2e": "docker-compose up -d test-db",
    // "posttest:e2e": "docker-compose stop test-db && docker-compose rm -f test-db",
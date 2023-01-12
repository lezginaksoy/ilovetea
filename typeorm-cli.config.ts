import { Coffee } from "src/coffes/entities/coffee.entity";
import { Flavor } from "src/coffes/entities/flavor.entity/flavor.entity";
import { coffeupdater1673544623355 } from "src/migrations/1673544623355-coffeupdater";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1',
    database: 'postgres',
    entities: [Coffee,Flavor],
    migrations: [coffeupdater1673544623355],
  });
import { Coffee } from "src/coffes/entities/coffee.entity";
import { Flavor } from "src/coffes/entities/flavor.entity/flavor.entity";
import { TeaRefactor1672847069870 } from "src/migrations/1672847069870-TeaRefactor";
import { schemaSync1672848398484 } from "src/migrations/1672848398484-schemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1',
    database: 'postgres',
    entities: [Coffee,Flavor],
    migrations: [TeaRefactor1672847069870,schemaSync1672848398484],
  });
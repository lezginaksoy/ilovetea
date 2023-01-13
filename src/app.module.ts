import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './modules/coffee-rating/coffee-rating.module';
import { CoffeeRatingService } from './services/coffee-rating/coffee-rating.service';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import appConfig from 'config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[appConfig],
    }),
   
    // Use Joi validation
// ConfigModule.forRoot({
//   validationSchema: Joi.object({
//     DATABASE_HOST: Joi.required(),
//     DATABASE_PORT: Joi.number().default(5432),
//   }),
//    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}

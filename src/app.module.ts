import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './modules/coffee-rating/coffee-rating.module';
import { CoffeeRatingService } from './services/coffee-rating/coffee-rating.service';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      autoLoadEntities: true,
      synchronize: false,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}

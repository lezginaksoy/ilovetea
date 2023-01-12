import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from 'src/services/coffee-rating/coffee-rating.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports:[DatabaseModule.register({
        type:'postgres',
        host:'localhost',
        port:5432,
        username: 'postgres',
        password: '1',       
    }),CoffeesModule],
    providers:[CoffeeRatingService]
})
export class CoffeeRatingModule {}

import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from 'src/services/coffee-rating/coffee-rating.service';

@Module({
    imports:[CoffeesModule],
    providers:[CoffeeRatingService]
})
export class CoffeeRatingModule {}

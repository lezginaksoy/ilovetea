import { Module } from '@nestjs/common';
import { CoffesController } from 'src/coffes/coffes.controller';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { TeasService } from 'src/services/teas/teas.service';
import { TeasController } from 'src/teas/teas.controller';

@Module({
  controllers: [CoffesController, TeasController],
  providers: [CoffeesService, TeasService],
})
export class CoffeesModule {}

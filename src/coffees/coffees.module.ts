import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffesController } from 'src/coffes/coffes.controller';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { TeasService } from 'src/services/teas/teas.service';
import { TeasController } from 'src/teas/teas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffesController, TeasController],
  providers: [CoffeesService, TeasService],
})
export class CoffeesModule {}

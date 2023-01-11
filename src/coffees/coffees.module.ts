import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffesController } from 'src/coffes/coffes.controller';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { Flavor } from 'src/coffes/entities/flavor.entity/flavor.entity';
import { Events} from 'src/events/entities/event.entity/event.entity';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { TeasService } from 'src/services/teas/teas.service';
import { TeasController } from 'src/teas/teas.controller';
import { COFFEE_BRANDS } from './coffees.constants';

//class MockCoffeesService{}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor,Events])],
  controllers: [CoffesController, TeasController],  
  exports:[CoffeesService],
  //providers: [CoffeesService, TeasService],
  providers: [CoffeesService, TeasService,{provide:COFFEE_BRANDS,useValue:['buddy brew','nescafe']}],
  //providers: [CoffeesService, TeasService,{provide:'COFFEE_BRANDS',useValue:['buddy brew','nescafe']}],
  //providers:[{provide:CoffeesService,useValue:new MockCoffeesService()}],
  //providers:[{ provide:CoffeesService,useClass:CoffeesService},{provide:TeasService,useClass:TeasService}]
})
export class CoffeesModule {}

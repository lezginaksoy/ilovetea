import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { CoffesController } from 'src/coffes/coffes.controller';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { Flavor } from 'src/coffes/entities/flavor.entity/flavor.entity';
import { Events} from 'src/events/entities/event.entity/event.entity';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { TeasService } from 'src/services/teas/teas.service';
import { TeasController } from 'src/teas/teas.controller';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeeConfig from './config/coffees.config';

@Injectable()
export class CoffeeBrandsFactory{
  create(){
    return ["starbucks coffee","Nero Coffee","Costa coffee"]
  }
}

//class MockCoffeesService{}
// class ConfigService{}
// class DevelopmentConfigService{}
// class ProdConfigService{}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor,Events]),ConfigModule.forFeature(coffeeConfig)],
  controllers: [CoffesController, TeasController],  
  exports:[CoffeesService],
  //providers: [CoffeesService, TeasService],

 providers: [CoffeesService, TeasService,CoffeeBrandsFactory,ConfigService,
    {
      provide:COFFEE_BRANDS, 
      useFactory:(brandFactory:CoffeeBrandsFactory)=>brandFactory.create(), scope:Scope.TRANSIENT,
      inject:[CoffeeBrandsFactory]
    }
    ]

  // providers: [CoffeesService, TeasService,CoffeeBrandsFactory,
  //   {
  //     provide: 'COFFEE_BRANDS',
  //     // Note "async" here, and Promise/Async event inside the Factory function 
  //     // Could be a database connection / API call / etc
  //     // In our case we're just "mocking" this type of event with a Promise
  //     useFactory: async (connection: Connection): Promise<string[]> => {
  //       // const coffeeBrands = await connection.query('SELECT * ...');
  //       const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
  //       console.log('Async Factory');
  //       return coffeeBrands;
  //     },
  //     inject: [Connection],
  //   }]

  //   ]
  // providers: [CoffeesService, TeasService,CoffeeBrandsFactory,
  //   {
  //     provide:COFFEE_BRANDS, 
  //     useFactory:(brandFactory:CoffeeBrandsFactory)=>brandFactory.create(),
  //     inject:[CoffeeBrandsFactory]
  //   }
  //   ]
  // providers: [CoffeesService, TeasService,{
  //   provide:ConfigService,
  //   useClass:process.env.NODE_ENV==='development'?DevelopmentConfigService:ProdConfigService
  // }],
  //providers: [CoffeesService, TeasService,{provide:COFFEE_BRANDS,useValue:['buddy brew','nescafe']}],
  //providers: [CoffeesService, TeasService,{provide:'COFFEE_BRANDS',useValue:['buddy brew','nescafe']}],
  //providers:[{provide:CoffeesService,useValue:new MockCoffeesService()}],
  //providers:[{ provide:CoffeesService,useClass:CoffeesService},{provide:TeasService,useClass:TeasService}]
})
export class CoffeesModule {}

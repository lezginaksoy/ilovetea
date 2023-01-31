import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import{Request} from 'express';
import { Injector } from '@nestjs/core/injector/injector';
import { InjectRepository } from '@nestjs/typeorm';
import { type } from 'os';
import { COFFEE_BRANDS } from 'src/coffees/coffees.constants';
import { CreateCoffeeDto } from 'src/coffes/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffes/dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { Flavor } from 'src/coffes/entities/flavor.entity/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Events } from 'src/events/entities/event.entity/event.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from 'src/coffees/config/coffees.config';

//@Injectable({scope:Scope.REQUEST})
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepo: Repository<Coffee>,
    @InjectRepository(Flavor) private readonly flavorRepo: Repository<Flavor>,
    private readonly datasource:DataSource,
    private readonly configService:ConfigService,
    // @Inject(COFFEE_BRANDS) coffeeBrands:string[],
    // @Inject(REQUEST) private readonly request: Request,
     //@Inject(coffeesConfig.KEY) private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>

    //@Inject('COFFEE_BRANDS') coffeeBrands:string[],    
  ) {
//console.log(coffeeBrands);
console.log('CoffeeService instantied!');
//const  databaseHost=this.configService.get<string>('DATABASE_HOST','localhost');
const  databaseHost=this.configService.get('database.host','localhost');

console.log(databaseHost);
//console.log(coffeesConfiguration.taste);

  }

  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: 'Test Roast',
  //     brand: 'Test Brew',
  //     flavors: ['Dark', 'Vanilla'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Test2 Roast',
  //     brand: 'Test2 Brew',
  //     flavors: ['Chocolate', 'blueberry'],
  //   },
  // ];

  findAll(pagingQuery:PaginationQueryDto) {
    const {limit,offset}=pagingQuery;

    return this.coffeeRepo.find({
      relations:{flavors:true},
      skip:offset,
      take:limit});
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepo.findOne({ where: { id: +id },relations:{flavors:true} });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      //throw `Coffee # ${id} not found`;
      //return new NotFoundException(`Coffee # ${id} not found`);
      //   return new HttpException(
      //     `Coffee # ${id} not found`,
      //     HttpStatus.NOT_FOUND,
      //   );
    }
    return coffee;
  }

  async create(coffeeDto: CreateCoffeeDto) {
   const flavors=await Promise.all(coffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))

    const coffee = this.coffeeRepo.create({...coffeeDto, flavors});
    return this.coffeeRepo.save(coffee);
    //this.coffees.push(coffeeDto);
    //return coffeeDto;
  }

  async update(id: string, coffeeDto: UpdateCoffeeDto) {
    const flavors=coffeeDto.flavors && await Promise.all(coffeeDto.flavors.map(name=>this.preloadFlavorByName(name)))

    const coffeeUpdated = await this.coffeeRepo.preload({
      id: +id,
      ...coffeeDto,
      flavors
    });
    if (!coffeeUpdated) {
      throw new NotFoundException(`Coffee # ${id} not Found`);
    }
    return this.coffeeRepo.save(coffeeUpdated);
    // const exisitingcoffee = this.findOne(id);
    // if (exisitingcoffee) {
    //   //do something
    // }
  }
  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepo.remove(coffee);
    // const coffeeIndex = this.coffees.findIndex((item) => item.id == +id);
    // if (coffeeIndex >= 0) {
    //   this.coffees.splice(coffeeIndex, 1);
    // }
  }

  private async preloadFlavorByName(name:string):Promise<Flavor> {
    const existingFlovor=await this.flavorRepo.findOne({where:{name}});
  if (existingFlovor) {
    return existingFlovor;
  }
    return this.flavorRepo.create({name});
  }

async recommendCoffe(coffee:Coffee){

  const queryRunner=this.datasource.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();
try {
 coffee.recommendation++;
  
 const recommendEvent= new Events();
 recommendEvent.name='REcommend Coffee';
 recommendEvent.type='coffee';
recommendEvent.payload = { coffeeId: coffee.id };

await queryRunner.manager.save(coffee);
await queryRunner.manager.save(recommendEvent);


await queryRunner.commitTransaction();
} catch (error) {
  await queryRunner.rollbackTransaction();
}
finally{
  await queryRunner.release();
}
  
}

}

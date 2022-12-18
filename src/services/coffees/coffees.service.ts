import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffes/dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffes/dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepo: Repository<Coffee>,
  ) {}

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

  findAll() {
    return this.coffeeRepo.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepo.findOne({ where: { id: +id } });
    if (!coffee) {
      throw new NotFoundException(`Coffe #${id} not found`);
      //throw `Coffee # ${id} not found`;
      //return new NotFoundException(`Coffee # ${id} not found`);
      //   return new HttpException(
      //     `Coffee # ${id} not found`,
      //     HttpStatus.NOT_FOUND,
      //   );
    }
    return coffee;
  }

  create(coffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepo.create(coffeeDto);
    return this.coffeeRepo.save(coffee);
    //this.coffees.push(coffeeDto);
    //return coffeeDto;
  }

  async update(id: string, coffeeDto: UpdateCoffeeDto) {
    const coffeeUpdated = await this.coffeeRepo.preload({
      id: +id,
      ...coffeeDto,
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
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from 'src/coffes/entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Test Roast',
      brand: 'Test Brew',
      flavors: ['Dark', 'Vanilla'],
    },
    {
      id: 2,
      name: 'Test2 Roast',
      brand: 'Test2 Brew',
      flavors: ['Chocolate', 'blueberry'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id == +id);
    if (!coffee) {
      throw `Coffee # ${id} not found`;
      //return new NotFoundException(`Coffee # ${id} not found`);
      //   return new HttpException(
      //     `Coffee # ${id} not found`,
      //     HttpStatus.NOT_FOUND,
      //   );
    }
    return coffee;
  }

  create(coffeeDto: any) {
    this.coffees.push(coffeeDto);
    return coffeeDto;
  }

  update(id: string, coffeeDto: any) {
    const exisitingcoffee = this.findOne(id);
    if (exisitingcoffee) {
      //do something
    }
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id == +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffes')
export class CoffesController {
  constructor(private readonly coffeService: CoffeesService) {}
  @Get()
  findAll() {
    return this.coffeService.findAll();
  }
  @Get('paging')
  findAll2(@Query() pagingQuery) {
    const { limit, offset } = pagingQuery;
    return `This Action return all coffes. Limit:${limit} offset:${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.coffeService.findOne('' + id);
    //return `This Action return #${id} coffe`;
  }
  @Post()
  create(@Body() body: CreateCoffeeDto) {
    console.log(CreateCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeService.create(body);
    //return body;
  }

  @Post('post2')
  create2(@Body('Name') body) {
    return this.coffeService.create(body);
    //return body;
  }

  @Post('post3')
  create3(@Body() body) {
    return body.Brand;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeService.update(id, body);
    //return `This Action update # ${id} tea with ${body.Name}`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.coffeService.remove(id);
    // return `This Action remove # ${id}`;
  }
}

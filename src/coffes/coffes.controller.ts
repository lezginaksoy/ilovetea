import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseFilters
} from '@nestjs/common';
import { ValidationTypes } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

//Controller-scoped, 
//@UsePipes(ValidationPipe)
//@UsePipes(new ValidationPipe())
@Controller('coffes')
export class CoffesController {
  constructor(private readonly coffeService: CoffeesService) {
    console.log('CoffeeController instantied!');
  }

  //Method-scoped, 
  @UsePipes(ValidationPipe)
  @Get()
  findAll(@Query() pagingQuery:PaginationQueryDto) {
    const { limit, offset } = pagingQuery;
    return this.coffeService.findAll(pagingQuery);
    //return this.coffeService.findAll();
  }
  // @Get('paging')
  // findAll2(@Query() pagingQuery:PaginationQueryDto) {
   
  //   //return `This Action return all coffes. Limit:${limit} offset:${offset}`;
  // }

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

// ValidationPipe==> Param-scoped 
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateCoffeeDto) {
    return this.coffeService.update(id, body);
    //return `This Action update # ${id} tea with ${body.Name}`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.coffeService.remove(id);
    // return `This Action remove # ${id}`;
  }
}

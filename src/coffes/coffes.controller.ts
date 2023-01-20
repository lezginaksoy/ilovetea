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
  UseFilters,
  SetMetadata
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationTypes } from 'class-validator';
import { resolve } from 'path';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { CoffeesService } from 'src/services/coffees/coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

//Controller-scoped, 
//@UsePipes(ValidationPipe)
//@UsePipes(new ValidationPipe())
@ApiTags('Coffees')
@Controller('coffees')
export class CoffesController {
  constructor(private readonly coffeService: CoffeesService) {
    console.log('CoffeeController instantied!');
  }

  //Method-scoped, 
  //@UsePipes(ValidationPipe)
  //@SetMetadata('isPublic',true)
  //@ApiResponse({status:403, description:'Forbidden.'})
  //@ApiForbiddenResponse({description:'forbidden !'})
  @Public() // metadata decorator 
  @Get()
  async findAll(@Protocol('https')protocol:string,@Query() pagingQuery:PaginationQueryDto) {
    const { limit, offset } = pagingQuery;
    console.log('protocol :'+ protocol);
    //await new Promise(resolve=>setTimeout(resolve,3000));
    return this.coffeService.findAll(pagingQuery);
    //return this.coffeService.findAll();
  }



  // @Get('paging')
  // findAll2(@Query() pagingQuery:PaginationQueryDto) {
   
  //   //return `This Action return all coffes. Limit:${limit} offset:${offset}`;
  // }

  @Public() // metadata decorator 
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
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

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('teas')
export class TeasController {
  @Get('EarlGrey')
  findAll(@Res() response) {
    response.status(200).send('This Action return earlgrey tea');
  }

  @Get(':id')
  findOne(@Param() param) {
    return `This Action return #${param.id} tea`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This Action update # ${id} tea with ${body.Name}`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This Action remove # ${id}`;
  }
}

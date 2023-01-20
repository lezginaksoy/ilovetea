import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
 
  @ApiProperty({description:'The Name of Coffee'})
  @IsString()
  readonly name: string;
 
  @ApiProperty({description:'The Brand of Coffee'})
  @IsString()
  readonly brand: string;
  
  @ApiProperty({description:'The flavor of Coffee'})
  @IsString({ each: true })
  readonly flavors: string[];
}

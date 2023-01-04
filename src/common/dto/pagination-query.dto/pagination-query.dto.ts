import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
@IsPositive()
@IsOptional()
//@Type(()=>Number)no need define here ,doing implicit type convrsion on global level by adding the transformoption{} to validepipe
limit:number;
@IsPositive()
@IsOptional()
//@Type(()=>Number)
offset:number;
}

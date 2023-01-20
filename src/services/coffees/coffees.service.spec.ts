import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { Flavor } from 'src/coffes/entities/flavor.entity/flavor.entity';
import { DataSource } from 'typeorm';
import { CoffeesService } from './coffees.service';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService,
        {provide:DataSource,useValue:{}},
        {provide:ConfigService,useValue:{}},
        {provide:getRepositoryToken(Coffee),useValue:{}},
        {provide:getRepositoryToken(Flavor),useValue:{}},
    ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
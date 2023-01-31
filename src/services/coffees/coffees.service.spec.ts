import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from 'src/coffes/entities/coffee.entity';
import { Flavor } from 'src/coffes/entities/flavor.entity/flavor.entity';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});


describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService,
        {provide:DataSource,useValue:{}},
        {provide:ConfigService,useValue:{}},      
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
    ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    //service = module.resolve(CoffeesService);//injected scoped
    
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
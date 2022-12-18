/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './flavor.entity/flavor.entity';
@Entity()//sql table=='coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;


  //@Column('json',{nullable:true})
  @JoinTable()
  @ManyToMany(
    type=>Flavor,
    flavor=>flavor.coffees,
    )
  flavors: string[];  
}

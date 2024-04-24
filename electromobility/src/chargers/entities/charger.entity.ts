import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Charge_points'})
@ObjectType()
export class Charger {
  
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string

  @Column()
  @Field( () => String )
  status: string

  @Column()
  @Field( () => String )
  operator: string

  @Column()
  @Field( () => Int )
  connections: number

  @Column()
  @Field( () => String )
  latitude: string

  @Column()
  @Field( () => String )
  longitude: string

  @Column()
  @Field( () => String )
  country: string

  @Column()
  @Field( () => Int )
  power: number
}

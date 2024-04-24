import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateChargerInput {
  
  @Field( () => String )
  @IsNotEmpty()
  status: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  operator: string

  @Field( () => Int )
  @IsNotEmpty()
  @IsPositive()
  connections: number

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  latitude: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  longitude: string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  country: string

  @Field( () => Int )
  @IsNotEmpty()
  @IsPositive()
  power: number
}

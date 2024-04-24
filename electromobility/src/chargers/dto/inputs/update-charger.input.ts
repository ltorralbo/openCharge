import { CreateChargerInput } from './create-charger.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChargerInput extends PartialType(CreateChargerInput) {
  @Field(() => Int)
  id: number;
}

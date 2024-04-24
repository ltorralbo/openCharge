import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ChargersService } from './chargers.service';
import { Charger } from './entities/charger.entity';
import { UpdateChargerInput, CreateChargerInput} from './dto/inputs/index';


@Resolver(() => Charger)
export class ChargersResolver {
  constructor(private readonly chargersService: ChargersService) {}

  @Mutation(() => Charger)
  async createCharger(
    @Args('createChargerInput') createChargerInput: CreateChargerInput
  ) : Promise<Charger> {
    return this.chargersService.create(createChargerInput);
  }

  @Query(() => [Charger], { name: 'chargers' })
  async findAll() : Promise<Charger[]> {
    return this.chargersService.findAll();
  }

  @Query(() => Charger, { name: 'charger' })
  async findOne(@Args('id', { type: () => ID }) id: string) : Promise<Charger> {
    return this.chargersService.findOne(id);
  }

  @Mutation(() => Charger)
  updateCharger(@Args('updateChargerInput') updateChargerInput: UpdateChargerInput) {
    return this.chargersService.update(updateChargerInput.id, updateChargerInput);
  }

  @Mutation(() => Charger)
  removeCharger(@Args('id', { type: () => Int }) id: number) {
    return this.chargersService.remove(id);
  }
}

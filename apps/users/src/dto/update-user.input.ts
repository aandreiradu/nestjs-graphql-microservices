import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  email?: string;
}

import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from './users.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  body: string;

  @Field()
  userId: string;

  @Field(() => User)
  user?: User;
}

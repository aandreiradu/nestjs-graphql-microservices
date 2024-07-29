import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserInput: CreateUserInput) {
    this.users.push(createUserInput);
    return createUserInput;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const userExistsIndex = this.users.findIndex((user) => user.id === id);

      if (userExistsIndex === -1) {
        throw new BadRequestException('User not found');
      }

      const user = this.users[userExistsIndex];
      const updatedUser = {
        ...user,
        ...updateUserInput,
        id: id,
      };

      this.users[userExistsIndex] = updatedUser;

      return updateUserInput;
    } catch (error) {
      if (error instanceof BadRequestException) throw BadRequestException;

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

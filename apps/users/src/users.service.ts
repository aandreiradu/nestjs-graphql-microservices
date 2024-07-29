import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

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
        throw new NotFoundException('User not found');
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
      if (error instanceof NotFoundException) throw error;

      console.error(`Failed to update user with id ${id}`);
      console.error(updateUserInput);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  remove(id: string) {
    try {
      const userExistsIndex = this.users.findIndex((user) => user.id === id);

      if (userExistsIndex === -1) {
        throw new NotFoundException('User not found');
      }

      const filteredUsers = this.users.filter((user) => user.id !== id);
      this.users = filteredUsers;

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Failed to remove user with id ${id}`);
      throw new InternalServerErrorException('Failed to remove user');
    }
  }
}

import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private userModel: Model<User>,) {
      
    }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

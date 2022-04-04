import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from 'src/utils/logger';
import { handleError } from 'src/utils/error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all/:userId')
  async findAll(
    @Res() res,
    @Param('userId') userId: string,
  ) {
    //return this.usersService.findAll();
    try {
      logger.info('------INIT GETUSERS-----');
      var allUsers = [];
      var tab = [];
      const users = await this.usersService.findAll(userId);
       allUsers = users;
      for (let i = 0; i < allUsers.length; i++) {
        let userObject = {
          firstname: allUsers[i].firstname,
          lastname: allUsers[i].lastname,
          phoneNumber: allUsers[i].phoneNumber,
          userFiles: "/Users/amidouseck/Desktop/Dev_mobile/"+allUsers[i].userFiles.profilePhoto,
          _id: allUsers[i]._id,
          created_at: allUsers[i].created_at,
        }
        tab.push(userObject);
      }
      logger.info('-----Successfully get user-----');
      return res.status(HttpStatus.CREATED).json({
        message: 'Successfully get user',
        user: tab,
      });
    } catch (error) {
      handleError(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

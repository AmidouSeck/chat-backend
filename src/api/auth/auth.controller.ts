import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserFiles } from '../users/interfaces/userFiles.interface';
import { logger } from 'src/utils/logger';
import { UploadHelper } from 'src/utils/helpers/upload-image.helper';
import { handleError } from 'src/utils/error';
import { diskStorage } from 'multer';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import express, {Request, Response} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/signin')
  async signIn(@Res() res: Response, @Body() loginData: AuthCredentialsDto) {
    try {
      logger.info(`signin.controller ${loginData.phoneNumber}`);
      const userData = await this.authService.loginUser(loginData);
      // if (userData.doTwofactorAuth) {
      //   return res.status(HttpStatus.CREATED).json({
      //     phoneNumber: userData.user.phoneNumber,
      //     isDeviceVerified: false,
      //   });
      // } else {
        logger.info(`signin.controller ${loginData.phoneNumber}----SUCCESS`);
        return res.status(HttpStatus.OK).send({
          userId: userData.user._id,
          //token: userData.token,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          isDeviceVerified: true,
          //email: userData.user.email,
          phoneNumber: userData.user.phoneNumber,
        });
     // }
    } catch (error) {
      handleError(error);
      return res.status(error.status).json({ message: error.message });
    }
  }

  //@UseGuards(ThrottlerGuard)
  //@Throttle(1, 86400)
  @Post('/signup')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profilePhoto', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: UploadHelper.uploadDirectory,
          filename: UploadHelper.customFileName,
        }),
      },
    ),
  )
  async signUp(
    @UploadedFiles()
    files: {
      profilePhoto: Express.Multer.File[];
    },
    @Res() res: Response,
    @Body() createUserDTO: CreateUserDto,
  ) {
    try {
      const userFiles: UserFiles = {
        profilePhoto: '',
      };
      logger.info(`signup.controller ${createUserDTO.phoneNumber}`);
      if (files.profilePhoto === undefined) {
        logger.info(
          `signup.controller request send without field profilePhoto`,
        );
        return res
          .status(403)
          .json({ message: 'Path profilePhoto is required in files array' });
      }
      userFiles.profilePhoto = files.profilePhoto[0].filename;
      
      const userPhoneNumber = await this.authService.addUser(
        createUserDTO,
        userFiles,
      );
      logger.info(`signup.controller ${createUserDTO.phoneNumber}----SUCCESS`);
      return res.status(HttpStatus.CREATED).json({
        phoneNumber: userPhoneNumber,
      });
    } catch (error) {
      handleError(error);
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

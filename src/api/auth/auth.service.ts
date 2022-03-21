import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { logger } from 'src/utils/logger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserFiles } from '../users/interfaces/userFiles.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/interfaces/user.interface';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { validatePassword } from 'src/utils/helpers/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,) {}

  async addUser(userData: CreateUserDto, userFiles: UserFiles) {
    try {
      const user = await this.userModel.findOne({
        $or: [
          { phoneNumber: userData.phoneNumber },
          //{ cniNumber: userData.cniNumber },
        ],
      });
      if (user) {
        throw new HttpException(
          'Cet utilisateur existe déjà',
          HttpStatus.CONFLICT,
        );
      }
      const newUser = new this.userModel(userData);
      
      newUser.userFiles = userFiles;

      await newUser.save();
      // await this.sendVerificationSmsCode(userData.phoneNumber);
      // logger.info(
      //   `addUser phoneNumber twilio test ${newUser.phoneNumber}----SEND`,
      // );
      return newUser.phoneNumber;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async loginUser(loginData: AuthCredentialsDto) {
    logger.info('--INIT LOGIN---');
    try {
      const findUser: Promise<User> = new Promise((resolve) =>
        resolve(
          this.userModel
            .findOne({ phoneNumber: loginData.phoneNumber })
        ),
      );
      const user = await findUser;

      if (!user) {
        throw new HttpException(
          'Aucun utilisateur trouvé',
          HttpStatus.NOT_FOUND,
        );
      }
      const passwordValidation = this.userModel
      .findOne({ phoneNumber: loginData.phoneNumber, pinCode: loginData.pinCode })
      const isMatch = await passwordValidation;
      if (!isMatch) {
        throw new HttpException('Mot de passe invalide', HttpStatus.FORBIDDEN);
      }
      return  {user};
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

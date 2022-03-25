import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './interfaces/chat.interface';
import { User } from '../users/interfaces/user.interface';
import mongoose from 'mongoose';
import { logger } from 'src/utils/logger';

@Injectable()
export class ChatService {

  constructor(
    @InjectModel('Chat')
    private chatModel: Model<Chat>,
    @InjectModel('User')
    private userModel: Model<User>,
    ) {
      
    }

    async postMessage(userData: CreateChatDto, userFiles: any) {
      try {
        logger.info('----- CHAT.SERVICE STARTED -----');
        const user = await this.userModel.findOne({
           _id: new mongoose.Types.ObjectId(userData.user1) 
        });
        if (!user) {
          logger.info('----- CHAT.SERVICE USER NOT FOUND -----');
          throw new HttpException(
            'Cet utilisateur n\'existe pas',
            HttpStatus.CONFLICT,
          );
        }
        const newMsg = new this.chatModel(userData);
        if(userFiles != null && userFiles != undefined && userFiles != '') {
          logger.info('----- CHAT.SERVICE USER INSTANCE OF FILE -----');
          newMsg.messageContent = userFiles;
        } else {
          newMsg.messageContent = userData.messageContent;
        }

        await newMsg.save();
        logger.info('----- CHAT.SERVICE USER MSG SAVED SUCCESSFULLY -----');
        return newMsg.sender;
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }


    async getMessage(userData: CreateChatDto, userFiles: any) {
      try {
        logger.info('----- CHAT.SERVICE STARTED -----');
        const user = await this.chatModel.findOne({
          $or: [
           {sender: new mongoose.Types.ObjectId(userData.sender)},
           {sender: new mongoose.Types.ObjectId(userData.sender)},
          ],
        });
        if (!user) {
          logger.info('----- CHAT.SERVICE USER NOT FOUND -----');
          throw new HttpException(
            'Cet utilisateur n\'existe pas',
            HttpStatus.CONFLICT,
          );
        }
        const newMsg = new this.chatModel(userData);
        if(userFiles != null && userFiles != undefined && userFiles != '') {
          logger.info('----- CHAT.SERVICE USER INSTANCE OF FILE -----');
          //newMsg.img = userFiles;
        }
  
        await newMsg.save();
        logger.info('----- CHAT.SERVICE USER MSG SAVED SUCCESSFULLY -----');
        return newMsg.sender;
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}

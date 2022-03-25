import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UploadedFiles, Res, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { logger } from 'src/utils/logger';
import { handleError } from 'src/utils/error';
import express, {Request, Response} from 'express';
import { diskStorage } from 'multer';
import { UploadHelper } from 'src/utils/helpers/upload-image.helper';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }
  @Post('/postmessage')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: UploadHelper.uploadDirectory,
          filename: UploadHelper.customFileName,
        }),
      },
    ),
  )
  async postMessage(
    @UploadedFiles()
    files: {
      img: Express.Multer.File[];
    },
    @Res() res: Response,
    @Body() createChatDTO: CreateChatDto,
  ) {
    try {
      logger.info(`chat.controller ${createChatDTO.sender}`);
      var imgUrl: string;
      if (files.img !== undefined) {
        logger.info(
          `chat.controller request send with field img`,
        );
       imgUrl = files.img[0].filename;;
      }
     
      const userChatResponse = await this.chatService.postMessage(
        createChatDTO,
        imgUrl,
      );
      logger.info(`chat.controller ${createChatDTO.sender}----SUCCESS`);
      return res.status(HttpStatus.CREATED).json({
        response: userChatResponse,
      });
    } catch (error) {
      handleError(error);
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}

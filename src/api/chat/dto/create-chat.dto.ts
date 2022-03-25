import {
    IsNotEmpty,
    MinLength,
  } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  user1: string;

  @IsNotEmpty()
  user2: string;

  @IsNotEmpty()
  sender: string;

  img: Express.Multer.File[];

  @IsNotEmpty()
  messageContent: string;

  //@IsNotEmpty()
  messageType: string;

}

import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './chat.model';
import { UserSchema } from '../users/user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Chat', schema: ChatSchema },
    {
      name: 'User',
      schema: UserSchema,
    },
  ])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}

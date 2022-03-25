import { ChatModule } from './api/chat/chat.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MomentModule } from '@ccmos/nestjs-moment';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { UserSchema } from './api/users/user.model';
import { ChatSchema } from './api/chat/chat.model';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/chat'),
  MulterModule.register({
    dest: '/opt/derCore',
  }),
  MomentModule.forRoot({
    tz: 'Africa/Dakar',
  }),
  MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema,
    },
    {
      name: 'Chat',
      schema: ChatSchema,
    },
  ]),
  UsersModule,
  AuthModule,
  ChatModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

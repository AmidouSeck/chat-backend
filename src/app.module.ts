import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MomentModule } from '@ccmos/nestjs-moment';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { UserSchema } from './api/users/user.model';

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
  ]),

  // MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   useFactory: async (configService: ConfigService) => ({
  //     uri: configService.get<string>('db.uri'),
  //     user: process.env.MONGO_USER,
  //     pass: process.env.MONGO_PASS,
  //     dbName: process.env.MONGO_NAME,
  //     useNewUrlParser: true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //   }),
  //   inject: [ConfigService],
  // }),
  UsersModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

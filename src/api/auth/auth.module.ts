import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.model';

@Module({
  imports: [
    //RateLimiterModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
  ]),
],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

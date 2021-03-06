import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
  } from 'class-validator';
  
  export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    phoneNumber: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    pinCode: string;
  }
  
import {
    IsNotEmpty,
    MinLength,
  } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
  profilePhoto: Express.Multer.File[];

  @IsNotEmpty()
  //@Matches(/^(221|00221|\+221)?(77|78|75|70|76)[0-9]{7}$/mg)
  phoneNumber: string;

  @IsNotEmpty()
  dateOfBirth: string;


  @IsNotEmpty()
  @MinLength(4)
  readonly pinCode: string;
}

import { Document } from 'mongoose';
import { UserFiles } from './userFiles.interface';

export interface User extends Document {
  readonly firstname: string;
  readonly lastname: string;
  phoneNumber: string;
  pinCode: string;
  profilePhoto?: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  userFiles?: UserFiles;
  dateOfBirth: string;
}

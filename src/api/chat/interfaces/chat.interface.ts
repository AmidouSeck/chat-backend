import { Document } from 'mongoose';

export interface Chat extends Document {
  user1: any;
  user2: any;
  sender: any;
  messageContent: string;
//   messageType: string;
  created_at: Date;
  updated_at: Date;
}

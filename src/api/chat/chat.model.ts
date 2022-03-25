import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user2: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messageContent: {
    type: String,
    required: true,
  },
  
  created_at: {
    type: Date,
    default: Date,
  },
  updated_at: {
    type: Date,
    default: Date,
  },
});
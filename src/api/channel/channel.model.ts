import * as mongoose from 'mongoose';

export const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  channelImg: {
    type: String,
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

  date: {
    type: String,
    required: true,
  },

  time: {
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
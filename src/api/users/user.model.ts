import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    index: true,
    required: true,
  },
  lastname: {
    type: String,
    index: true,
    required: true,
  },

  phoneNumber: {
    type: String,
    unique: true,
    index: true,
  },
  pinCode: {
    type: String,
    required: true,
  },

  userFiles: {
    profilePhoto: String,
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
'use strict';

const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const { roles, USER } = require('../constants/roles');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const UserSchema = new Schema({
  // id: { type: String,
  //    default: uuid,
  //     unique: true },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    default: USER,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: { type: Date, default: Date.now },
  lastFailedLogin: Date,
  currentLogin: { type: Date, default: Date.now },
}, options)

UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', UserSchema);

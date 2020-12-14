'use strict';

const User = require('../../models/user');
const { ADMIN } = require('../../constants/roles');
const { PermissionDeniedError } = require('../../constants/errors');
const { generate: generateToken } = require('../../lib/token');
const db = require('../../constants/db');

const createUser = async (req, res, next) => {
  try {
    const doc = new User(req.body);
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new InvalidCredidentialsError();
      return next(error);
    }  
    const isPasswordMatched = await User.findOne({ password: req.body.password });
    if (!isPasswordMatched) {
      const error = new InvalidCredidentialsError();
      return next(error);
    }
    const tokenPayload = {
      userId: user.id,
      role: user.role,
    };
    const token = await generateToken(tokenPayload);
    const resData = {
      token,
      email: user.email,
      name: user.name,
      role: user.role,
      status: 'OK',
    };
    res.json(resData);
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, User , query))
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  try {
    // const result = await User.findById({ id: req.params.id }, { password: false });
    const result = await User.findById({ id: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
  // try {
  //   const id= await User.findById({ id: req.params.id }, { password: false });
  //   const result = await db.getItem(id, User)
  //   const data = {
  //     success: true,
  //     statuscode: 200,
  //     message: 'Record found successfully',
  //     item: result
  //   }
  //   res.status(200).json(data)
  // } catch (error) {
  //   next(error);
  // }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  User.findOneAndRemove({id: req.params.id})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.id
      });
  });
};

const search = async (req,res) => {
    const searchfield = req.query.name || req.query.mobile;
    User.find( { $or:[ {'name':{$regex: searchfield,$options: '$i'}}, {'mobile':{$regex: searchfield,$options: '$i'}}]})   
    .then(data => {
      res.send(data);
    })
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  search
};

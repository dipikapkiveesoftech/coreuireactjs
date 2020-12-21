'use strict';
const User = require('../../models/user');
const { generate: generateToken } = require('../../lib/token');
const { verify: verifyToken } = require('../../lib/token');
const bcrypt = require('bcryptjs')
const createUser = async (req, res) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({ email });;
    if (user) {     
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }
    const password = await bcrypt.hash(req.body.password, 12);
   
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      role: req.body.role,
      password: password
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  const isMatch = await User.findOne({ password });
  if (isMatch) {
    // Sign in the token and issue it to the user
    const tokenPayload = {
      userId: user._id,
      role: user.role,
    };
    const token = await generateToken(tokenPayload);
    console.log("token", token);
    const resData = {
      token,
      email: user.email,
      name: user.name,
      role: user.role,
      status: 'OK',
    };

    return res.status(200).json({
      ...resData,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};
const getUsers = async (req, res, next) => {
  try {
    const result = await User.find({}, { password: false }).lean();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {

  try {
    const result = await User.findOne({ id: req.params.id }, { password: false });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.mobile) {   
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  User.findOneAndUpdate({ id: req.params.id }, {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile, 
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(user);
    }).catch(err => {
      console.log(err);
      if (err.name === 'MongoError' && err.code === 11000) {      
          return res.status(409).send({
          message: "fill all detail for " + req.params.id
        });
      }
      return res.status(400).send({
        message: "User not found with " + req.params.id

      });
    });
};

const deleteUser = async (req, res) => {
  User.findOneAndRemove({ id: req.params.id })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};

const search = async (req, res) => {
  const searchfield = req.query.name || req.query.mobile;
  User.find({ $or: [{ 'name': { $regex: searchfield, $options: '$i' } }, { 'mobile': { $regex: searchfield, $options: '$i' } }] })
    .then(data => {
      res.send(data);
    })
};

const getprofile = async (req, res) => {
  console.log("dsfgg");
  console.log("get", req.headers.authorization);
  try {
    verifyToken(req.headers.authorization)
      .then(data => {
        res.send(data);
      });
  } catch {
    return res.status(400).json({
      message: `token not verified`,
      success: false
    });
  }
}

const checkRole = (roles) => async (req, res, next) => {
console.log("check");
  try {
  const data = {
    id: req.user.id,
    roles
  }
  await checkPermissions(data, next)
} catch (error) {
  console.log("errror");
}
}

const checkPermissions = async (data, next) => {
  return new Promise((resolve, reject) => {
    User.findById(data.id, (err, result) => {
      itemNotFound(err, result, reject, 'NOT_FOUND')
      if (data.roles.indexOf(result.role) > -1) {
        return resolve(next())
      }
      return reject(buildErrObject(401, 'UNAUTHORIZED'))
    })
  })
}

const buildErrObject = (code, message) => {
  return {
    code,
    message
  }
}

const itemNotFound = (err, item, reject, message) => {
  if (err) {
    reject(buildErrObject(422, err.message))
  }
  if (!item) {
    reject(buildErrObject(404, message))
  }
}
module.exports = {
  getprofile,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  search,
  checkRole,
};

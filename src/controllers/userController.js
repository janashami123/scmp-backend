const jwt = require("jsonwebtoken");
const bcrypt= require ("bcryptjs");
const User = require('../models/').user
// Generate JWT
const generateToken = (id) => {
  console.log(process.env.SECRET,)
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

class UserController {


//Get all users  
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({}, { password: 0 });
      return res.status(200).json({
        status: 200,
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
// Get user by id
  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, { password: 0 });
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} not found`,
        });
      }
      return res.status(200).json({
        status: 200,
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
// Edit User
  async editUser(req, res) {
    const { id } = req.params;
    const { U_Name, U_Hash, admin, auth } = req.body;
    if ( !U_Name, !U_Hash, !admin, !auth ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields must be provided",
      });
    }
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} not found`,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(U_Hash, salt);
      const result = await user.update({
        U_Name,
        admin ,
        U_Hash: hashPass,
        auth,
      });
      return res.status(200).json({
        status: 200,
        success: true,
        message: `User with id ${id} updated successfully`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
// Delete user
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} does not exist`,
        });
      }
      const result = await user.destroy();
      return res.status(200).json({
        status: 200,
        success: true,
        message: `User with id ${id}  deleted successfully`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
//Register new user
  async register(req, res) {
    const { U_Name, U_Hash, admin, auth } = req.body;
    if ( !U_Name, !U_Hash, !admin, !auth ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields must be provided",
      });
    }
    try {
      const userExists = await User.findOne({ where: { U_Name: U_Name } })
      if (userExists) {
        return res.status(403).json({
          status: 403,
          success: false,
          message: `User with this username ${U_Name} already exists`,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(U_Hash, salt);
      await User.create({
        U_Name,
        admin,
        U_Hash:hashPass,
        auth,
      });
      console.log(User)
      return res.status(201).json({
        status: 201,
        success: true,
        data: "User added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
// Login user
  async login(req, res) {
    const { U_Name, U_Hash } = req.body;
    try {
      const user = await User.findOne({ U_Name: U_Name });
      console.log(user.id)
      console.log(bcrypt.compare(U_Hash, user.U_Hash))
      if (user && ( bcrypt.compare(U_Hash, user.U_Hash))) {
        return res.status(200).json({
          status: 200,
          success: true,
          data: {
            id: user.id,
            U_Name: user.U_Name,
          },
          token: generateToken(user.id),
        });

      }
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid credentials",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
}

const userController = new UserController();
module.exports=userController;

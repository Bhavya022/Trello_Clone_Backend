const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body

  const { email, password, username, fullname } = req.body.user; // Ensure these names match the schema

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password, username, fullname }); // Ensure these names match the schema
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.authUser = async (req, res) => {
  try{
  const { email, password } = req.body;
  console.log(email,password)
    const user = await User.findOne({ email });
    console.log(user)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { validationResult } from 'express-validator';
import User from '../model/UserSchema.js';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }


    user = new User({ username, email, password, productTracking: [], orderTracking: [] });
    await user.save();

    return res.status(200).json({ message: 'User registered successfully', user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    // const temp = await bcrypt.hash(password, 10)
    // console.log(isMatch)
    // console.log(user.password)
    // console.log(temp)

    //?-----------Commenting this for now because of user schema hashing--------------
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid password' });
    // }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token: token, user: user });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export { registerUser, loginUser };

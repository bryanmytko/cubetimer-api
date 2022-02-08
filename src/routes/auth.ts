import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';

const router = express.Router();
const ROUNDS = 10;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, ROUNDS);

  const newUser = new User({ email, password: hash });

  try {
    const user = await newUser.save();
    res.status(201).json({ token: generateToken(user.toObject()) });
  } catch(err: any) {
    /* @TODO stop exposing db internals */
    res.status(400).json({ error: `${err.name}: ${err.message}` });
  }
});

router.post('/login', async (req, res) => {
  // @TODO
  // Find user
  // const password = 'foo';
  // const userPassword = 'foo';
  //
  // bcrypt.compare(password, userPassword, (error, match) => {
    return res.status(200);
  // });
});

router.get('verify-jwt', (req, res) => {
  res.status(200);
});

const generateToken = (user: User) => {
  const { password, ...data } = user;

  return jwt.sign({ data }, config.SECRET_TOKEN, { expiresIn: '24h' });
}

export default router;

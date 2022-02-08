import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';

const router = express.Router();
const ROUNDS = 10;

const invalidLogin = (res: Response) => res.status(400).json({ error: 'Invalid email/password' });

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
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if(!user) return res.status(400);

  bcrypt.compare(password, user.password, (error, match) => {
    if(error) return res.status(500).json({ error });
    if(match) return res.status(201).json({ token: generateToken(user) });

    return invalidLogin(res);
  });
});

/* @TODO need some kind of jwt verification middleware */
router.get('verify-jwt', (req, res) => {
  res.status(200);
});

const generateToken = (user: User) => {
  const { password, ...data } = user;

  return jwt.sign({ data }, config.SECRET_TOKEN, { expiresIn: '24h' });
}

export default router;

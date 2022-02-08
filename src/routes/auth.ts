import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();
const ROUNDS = 10;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, ROUNDS);
  // need user Model
  res.status(201);
});

router.post('/login', async (req, res) => {
  // Find user
  const password = 'foo';
  const userPassword = 'foo';

  bcrypt.compare(password, userPassword, (error, match) => {
    return res.status(200);
  });
});

router.get('verify-jwt', (req, res) => {
  res.status(200);
});

// const generateToken = (user: any) {
//   const { password, ...data } = user;
//
//   return 'token';
// }

export default router;

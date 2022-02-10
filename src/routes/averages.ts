import express, { Request, Response } from 'express';

import Average from '../models/average';

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    kind,
    fastest,
    slowest,
    calculated,
    solves,
    puzzleType
  } = req.body;

  const newAverage = new Average({
    kind,
    fastest,
    slowest,
    calculated,
    solves,
    puzzleType
  });

  try {
    const average = await newAverage.save();
    res.status(201).json({ average });
  } catch(err: any) {
    res.status(400).json({ error: `${err.name}: ${err.message}` });
  }
});

router.get('/', async (req, res) => {
  /* @TODO this requires our auth middleware to be implemented to get user
  const { user } = request.body;
   * const averages = await Average.find({ user });
   * res.status(200).json({ averages });
   * */
});

export default router;

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import mongoose, { ConnectOptions } from 'mongoose';

import config from './config';
import authRoute from './routes/auth';

const app = express();

const PORT = 3000;
const MONGO_URL = config.MONGO_URL;

const logger = pino({
  level: 'info'
});

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
} as ConnectOptions);

const db = mongoose.connection;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoute);
// app.use('/api/sessions', sessionsRoute);

db.once('open', () => logger.info('Database connected.'));
db.on('error', (error: Error) => logger.info(`Database error: ${error}`));

app.listen(PORT, () => {
  logger.info(`iServer started on port ${PORT}`);
});

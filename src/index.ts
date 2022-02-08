import express from 'express';
import cors from 'cors';
import pino from 'pino';

import authRoute from './routes/auth';

const app = express();

const PORT = 3000;
const logger = pino({
  level: 'info'
});

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoute);
// app.use('/api/sessions', sessionsRoute);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

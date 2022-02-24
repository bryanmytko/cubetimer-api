import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getConfig = (): ENV => ({
  MONGO_URL: process.env.MONGO_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET
});

const getSanitizedConfig = (rawConfig: ENV): Config => {
  for(const [key, value] of Object.entries(rawConfig)) {
    if(value === undefined) throw new Error(`Missing a required environment variable: ${key}`);
  }
  return rawConfig as Config;
};

const sanitizedConfig = getSanitizedConfig(getConfig());

export default sanitizedConfig;

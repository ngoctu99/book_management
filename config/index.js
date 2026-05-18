// select .env depend on production, test oder dev
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = process.env.NODE_ENV === 'production'
    ? '.env'
    : `.env.${process.env.NODE_ENV || 'development'}`

// absolute path to env file
const envPath = path.resolve(__dirname, '..', envFile);

// load env
dotenv.config({ path: envPath });

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',

    PORT: process.env.PORT || 3001,

    JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',

    JWT_TTL: process.env.JWT_TTL || '7d'
}

export default config;
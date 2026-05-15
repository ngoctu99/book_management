// select .env depend on production, test oder dev
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production'
    ? '.env'
    : `.env.${process.env.NODE_ENV || 'development'}`

dotenv.config({ path: envFile});

const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TTL: process.env.JWT_TTL
}

export default config;
// select .env depend on production, test oder dev
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production'
    ? '.env'
    : `.env.${process.env.NODE_ENV || 'development'}`

dotenv.config({ path: envFile});

const config = {
    PORT: process.env.PORT
}

export default config;
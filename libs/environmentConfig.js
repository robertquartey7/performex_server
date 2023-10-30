import dotenv from 'dotenv'
dotenv.config()

export const environment = {
    SECRET_KEY: process.env.SECRET_KEY,
    API_URL:"/api/v1",
    DB_URL: process.env.MONGODB_URL
}
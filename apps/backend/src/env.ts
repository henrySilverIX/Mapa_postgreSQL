import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT ?? "4000",
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://study:study@localhost:5432/studydb"
};
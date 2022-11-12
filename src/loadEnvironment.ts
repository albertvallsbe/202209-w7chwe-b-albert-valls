import dotenv from "dotenv";
dotenv.config();

const environment = {
  port: process.env.PORT,
  debug: process.env.DEBUG,
  mongoDbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
};

export default environment;

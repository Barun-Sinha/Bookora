import dotenv from 'dotenv';

import express from 'express';
import {connectDB} from "./utils/db.js";


import cookieParser from 'cookie-parser';
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import orderRoutes from "./routes/orders.js";
import authorRoutes from "./routes/authors.js";
import configurePassport from './config/passport.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

//core middleware
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

//need to configure passport strategies
configurePassport(passport);
app.use(passport.initialize());
//need to check the document if it will work fine.

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/authors',authorRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});



//connect Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});

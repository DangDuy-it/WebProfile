// src/index.ts
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import passport from './config/passport';
import session from 'express-session';

import profileRoutes from './routes/profileRoutes';
import contactsRoutes from './routes/contactsRoutes';
import resumeRoutes from './routes/resumeRoutes';
import portfolioRouter from './routes/portfolioRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  // Cho phép gửi cookie cross-origin
}));
app.use(express.json());
app.use(cookieParser());
// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 ngày
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Gắn routes
app.use('/api', profileRoutes);
app.use('/api', contactsRoutes);
app.use('/api', resumeRoutes);
app.use('/api', portfolioRouter);

// Route Google login
app.use('/api/auth', authRoutes);




// Khởi động server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server is running on port ${PORT}`);
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  }
});
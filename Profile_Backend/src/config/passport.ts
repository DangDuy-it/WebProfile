import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import prisma from './db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!; // Thêm vào .env

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false, { message: 'Không lấy được email từ Google' });
        }

        // Chỉ cho phép đúng 1 email admin
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          return done(null, false, { message: 'Email không phải admin' });
        }

        // Tạo JWT token
        const token = jwt.sign(
          { email, name: profile.displayName || 'Admin' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        return done(null, { token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export default passport;
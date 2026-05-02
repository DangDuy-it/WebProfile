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

        // 1. Kiểm tra xem có phải Admin không (Dùng biến .env của Duy)
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          return done(null, false, { message: 'Email không phải admin' });
        }

        // 2. Tìm Profile của Admin này trong DB để lấy Id
        let adminProfile = await prisma.profile.findFirst({
          where: { Email: email }
        });

        // 3. Nếu Duy chưa tạo Profile trong DB, hãy tạo luôn để lấy ID
        if (!adminProfile) {
            adminProfile = await prisma.profile.create({
                data: {
                    Email: email,
                    Name: profile.displayName || 'Admin'
                }
            });
        }

        // 4. Ký Token với cái Id vừa tìm được
        const token = jwt.sign(
          { 
            Id: adminProfile.Id,
            email: email, 
            name: profile.displayName || 'Admin' 
          },
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
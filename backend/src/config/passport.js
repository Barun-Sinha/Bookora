  import passportJwt from 'passport-jwt';
  import User from '../models/user.model.js';
  import dotenv from 'dotenv';
  dotenv.config(); 
  const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

  const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt; // match the cookie name you set in login
  }
  return token;
};

  // const opts = {
  //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   secretOrKey: process.env.JWT_SECRET
  // };

  const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer <token>
    cookieExtractor,                          // or from cookies
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

  export default function configurePassport(passport) {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id).select('-passwordHash');
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }));
  };

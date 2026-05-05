import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {config} from "./config.js";


passport.use(new GoogleStrategy({
  clientID: config.google_client_id,
  clientSecret: config.google_client_secret,
  callbackURL: `${config.backend_url}`,
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

export default passport;
import * as passport from 'passport';

import logger from './logger';
import User, { UserDocument } from './models/User';
import Retailer from './models/Retailer';

const dev = process.env.NODE_ENV !== 'production';

function auth({ server }) {
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser((email, done) => {
    User.findOne({ email }, User.publicFields())
      .populate('myRetailer', Retailer.publicFields())
      .exec(async (err, user) => {
        const userObj: any = user.toObject();

        done(err, userObj);
      });
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.post('/auth/login', (req, res) => {
    try {
      passport.authenticate('local', (err, user: UserDocument, info) => {
        if (err) {
          res.json({ success: false, message: err.message || err.toString() });
          return;
        }

        if (info) {
          res.json({
            success: false,
            message: info.message,
          });
          return;
        }

        if (!user) {
          res.json({
            success: false,
            message: 'Invalid credentials.',
          });
          return;
        }

        if (user.status !== 'active') {
          res.json({
            success: false,
            message:
              'Your account has been deactivated or blocked. Please contact admin for more info.',
          });
          return;
        }

        req.login(user, (error) => {
          if (error) {
            res.json({
              success: false,
              message: error.message || error.toString(),
            });
            return;
          }

          res.json({ success: true });
        });
      })(req, res);
    } catch (err) {
      logger.error(err);
      res.json({ error: err.message || err.toString() });
    }
  });

  server.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`${dev ? process.env.URL_APP : process.env.PRODUCTION_URL_APP}/login`);
    });
  });
}

export { auth };

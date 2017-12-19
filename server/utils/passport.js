import passport from 'passport';
import config from 'config';
import * as passportJwt from "passport-jwt";
import FacebookTokenStrategy from "passport-facebook-token";

module.export = app => {
  let Users = app.db.models.Users;

  const jwtOtps = {
    secretOrKey: config.get('secrets.jwtStr'),
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
  };
  fbTokenOpts = {
    clientID: config.get('secrets.fb.appId'),
    clientSecret: config.get('secrets.fb.appSecret')
  };

  let jwtStrategy = new passportJwt.Strategy(jwtOtps, (payload, done) => {
    Users.findById(payload.id).then(user => {
      if (user) {
        done(null, {
          id: user.id,
          name: user.name
        })
      } else
        return done(null, false);
    })
      .catch(err => done(err, null))
  });

  let fbTokenStrategy = new FacebookTokenStrategy(fbTokenOpts, (accessToken, refreshToken, profile, done) => {
    User.upsertFbUser(accessToken, refreshToken, profile, (err, user) => {
      return done(err, user);
    });
  });

  passport.use(jwtStrategy);

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticateJwt: () => {
      return passport.authenticate('jwtAuth', { session: false })
    },
    authenticateFb: () => {
      return passport.authenticate('facebook-token', { session: false })
    }
  }
}
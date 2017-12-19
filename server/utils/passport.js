import passport         from 'passport';
import config           from 'config';
import * as passportJwt from "passport-jwt";

module.export = app => {
  let Users = app.db.models.Users
  const jwtOtps = {
    secretOrKey: config.get('secrets.jwtStr'),
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
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

  passport.use(jwtStrategy);

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate('jwtAuth', { session: false })
    }
  }
}
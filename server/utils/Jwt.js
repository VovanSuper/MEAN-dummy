import jwt from 'jwt-simple';
import config from 'config';
import * as expressJwt from "express-jwt";

module.exports = app => {

  let jwtEncode = (id) => {
    return jwt.encode(
      {
        id: id
      },
      config.get('secrets.jwtStr'));
  }

  let authJwt = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function (req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });

  return {
    jwtEncode: jwtEncode,
    authJwt: authJwt
  }
}
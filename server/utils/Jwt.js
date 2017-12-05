import jwt from 'jwt-simple';
import config from 'config';

module.exports = app => id => {
    return jwt.encode({ id: id }, config.get('secrets.jwtStr'));
}
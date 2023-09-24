const jwt = require('jsonwebtoken');
const TarashaUser = require('../../models/user.model');
// const { use } = require('../../../app');

const auth = async (req, res, next) => {
  try {
    var token = req.headers['authorization'];
    if (token) {
      if (token.startsWith('Bearer ') || token.startsWith('bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        // console.log('token===============', token)
      }
      // decode token
      if (token) {
        // console.log('token',token);
        // return;
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          async function (err, decoded) {
            try {
              if (err) {
                console.log('eerrrrrrrrr=================', err);
                res.status(401).json({
                  message: 'Token not valid',
                  status_code: 401,
                });
              } else {
                console.log(decoded);
                console.log(token);
                // const isAccessTokenExpired =
                //   await userModel.isAccessTokenExpired(decoded.user_id, token);
                // console.log(
                //   '888888888888888888888888888',
                //   isAccessTokenExpired
                // );
                // if (isAccessTokenExpired) {
                //   res.status(401).json({
                //     message: 'Token Expired',
                //     status_code: 401,
                //   });
                //   return;
                // }

                // console.log(decoded);
                const user = await TarashaUser.findOne({
                  _id: decoded._id,
                });

                // console.log(user.tokens[0].accessHistoryId.ip);
                if (!user) {
                  throw new Error();
                }
                // console.log(user);
                req.token = token;
                req.user = user;
                next();
              }
            } catch (e) {
              res.status(500).json({
                message: 'Internal Server Error',
                status_code: 500,
                error: e,
              });
            }
          }
        );
      } else {
        res.status(401).json({
          message: 'Token format not valid',
          status_code: 401,
        });
      }
    } else {
      res.status(401).json({
        message: 'Token format not valid',
        status_code: 401,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
      status_code: 500,
      error: e,
    });
  }
};

module.exports = auth;

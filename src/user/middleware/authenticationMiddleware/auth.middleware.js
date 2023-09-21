const jwt = require('jsonwebtoken');
const TarashaUser = require('../../models/user.model');
// const { use } = require('../../../app');

const auth = async (req, res, next) => {
  try {
    console.log(req.header('Cookie'));
    // console.log(req.param.id);
    const token = req.header('Cookie').replace('token=', '');
    // console.log(req.header('Authorization'));
    // const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await TarashaUser.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    // console.log(user.tokens[0].accessHistoryId.ip);
    if (!user) {
      throw new Error();
    }
    // console.log(user);
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;

const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const generateResetToken = require('../../helpers/tokengenerator/passwordReset');
require('dotenv').config();
const sendMail = require('../../services/emailServices/email');
const { savePaymentDetails } = require('../payment/payment');
const { saveUserInquiry } = require('../Inquiry/Inquiry');
const Razorpay = require('razorpay');
const UserTransactions = require('../../models/user.transactions.model');
const axios = require('axios');

// const axios = require('axios');
const {
  SendCallConfirmationUserMail,
  SendCallConfirmationUserMailtoMe,
  SendInquiryConfirmationUserMail,
  SendInquiryConfirmationUserMailtoMe,
} = require('../email/email');
const {
  updateEventSummary,
} = require('../../../calendar/controllers/calendar.controller');
const signup = async (req, res) => {
  const useralready = await User.find({ email: req.body.email });
  if (useralready.length == 0) {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res
        .status(201)
        .cookie('token', token)
        .json({ success: true, data: { user: user, token } });
    } catch (e) {
      res.clearCookie('token');
      res.status(400).json({ succes: false, error: e.message });
    }
  } else {
    res.clearCookie('token');
    res.json({ sucess: false, Error: 'Email Already Registerd please LogIn' });
  }
};

const loginEmail = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res
      .status(200)
      .cookie('token', token)
      .json({ success: true, data: { user: user, token } });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

const profile = async (req, res) => {
  try {
    //   res.rediect('/dashboard');

    console.log(req.user);
    res.json({ success: true, data: req.user });
  } catch (e) {
    //   res.render('login');
    res.json({ success: false, error: e.message });
  }
};

const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'mobiles'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // updates.forEach((update) => (req.user[update] = req.body[update]));
    if (req.body.name) req.user['name'] = req.body['name'];

    if (req.body.mobiles && req.body.mobiles.length > 0) {
      req.user.mobiles = [];

      req.user.mobiles = req.user.mobiles.concat({
        ...req.body.mobiles[0],
      });
    }

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
};
const deleteUser = async (req, res) => {
  console.log(req.user);
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);

    const profileResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(profileResponse.data);

    const profileData = await profileResponse.data;

    const user = await User.findOne({ email: profileData.email });
    if (user) {
      console.log('User Already');
      try {
        console.log(user);

        // const userAccessHistory = new AccessHistory({
        //   user: user._id,
        //   ...req.body,
        // });
        // await userAccessHistory.save();
        const token_jwt = await user.generateAuthToken();

        // user.tokens = user.tokens.concat({
        //   token_jwt,
        // });
        user.isEmailVerified = true;

        // user.tokens = [{ token, accessHistoryId: userAccessHistory._id }];
        await user.save();

        res
          .status(201)
          .cookie('token', token_jwt)
          .json({ success: true, userData: { user, token: token_jwt } });
      } catch (err) {
        res.json({ success: false, error: err.message });
      }
    } else {
      // console.log('Email:', profileData.email);
      // console.log('Name:', profileData.name);
      // console.log('Profile Image:', profileData.picture);
      console.log(profileData);
      const newUser = new User({
        email: profileData.email,
        name: profileData.name,
        password: profileData.email,
        isEmailVerified: true,
      });
      //   const userAccessHistory = new AccessHistory({
      //     user: newUser._id,
      //     ...req.body,
      //   });

      try {
        // await userAccessHistory.save();
        await newUser.save();

        const token_jwt = await newUser.generateAuthToken();
        // newUser.tokens = newUser.tokens.concat({
        //   token_jwt,
        // });
        res
          .status(201)
          .cookie('token', token)
          .json({
            success: true,
            userData: { user: newUser, token: token_jwt },
          });
      } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user in the simulated database (replace with database query)
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log(user);
    const resetToken = generateResetToken(user._id);

    const link = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const info = await sendMail({
      toEmail: user.email,
      subject: 'Reset Your Password',
      // text: `${emailFrom} shared a file with you.`,
      html: require('../../services/emailServices/forgetPasswordTemplate')({
        user: user.name,
        link: link,
      }),
    })
      .then(() => {
        return res.json({ success: true, link });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ sucess: false, error: e.message });
      });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log(userId);
    // Find the user in the simulated database (replace with database query)
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    console.log(user);

    user.password = newPassword;
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const transaction_details = await savePaymentDetails(
      req.user._id,
      req.body.payment_details,
      'Call Consultancy Service'
    );
    if (transaction_details) {
      const success = await SendCallConfirmationUserMail(
        req.user,
        req.body.payment_details
      );

      console.log(success);
      if (success) {
        const success = await SendCallConfirmationUserMailtoMe(
          req.user,
          req.body.payment_details
        );
        if (success) {
          await updateEventSummary(
            req.body.eventId,
            `Call With ${req.user.name} \n Phone No. ${req.body.payment_details.number}`
          );
          res.status(200).json({ success: true, transaction_details });
        }
      }
    }
  } catch (err) {
    console.log(err);
    // throw err;
    res.json({ success: false, error: err.message });
  }
};

const inquirySuccess = async (req, res) => {
  try {
    const inquiry_details = await saveUserInquiry(
      req.user._id,
      req.body.inquiryData,
      req.body.packageInfo
    );
    if (inquiry_details) {
      const success1 = await SendInquiryConfirmationUserMail(req.user);

      console.log(success1);
      if (success1) {
        console.log(success1);
        const success2 = await SendInquiryConfirmationUserMailtoMe(
          req.user,
          req.body.inquiryData,
          req.body.packageInfo
        );
        if (success2) res.status(200).json({ success: true, inquiry_details });
      }
    }
  } catch (err) {
    console.log(err);
    // throw err;
    res.json({ success: false, error: err.message });
  }
};

const fetchPaymentDetailsFromRazorPay = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const { paymentId } = req.body;

    const response = await instance.payments.fetch(paymentId);
    // const response = await axios.get(
    //   `https://api.razorpay.com/v1/payments/${paymentId}`,
    //   {
    //     headers: {
    //       Authorization: `Basic ${Buffer.from(
    //         process.env.RAZORPAY_KEY + ':'
    //       ).toString('base64')}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    const paymentDetails = response;
    res.json({ success: true, paymentDetails: paymentDetails });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res
      .status(500)
      .json({ success: false, error: 'Error fetching payment details' });
  }
};

async function paginatedTransactions(req, res) {
  try {
    const { page = 1, limit = 10, search = '' } = req.body;
    console.log(search);
    // Construct the search query
    const searchQuery = {
      $and: [
        {
          $or: [
            { razorpay_payment_id: new RegExp(search, 'i') },
            { booking_type: new RegExp(search, 'i') },
            { booking_method: new RegExp(search, 'i') },
            { booking_remarks: new RegExp(search, 'i') },
            { payment_date: new RegExp(search, 'i') },
            { booking_date: new RegExp(search, 'i') },
          ],
        },
        { owner: req.user._id }, // Apply ownerId filter if provided
      ],
    };
    // Count the total number of matching documents
    const totalItems = await UserTransactions.countDocuments(searchQuery);

    // Paginate the results
    const transactions = await UserTransactions.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      transactions: transactions,
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (error) {
    console.error('Error fetching paginated transactions:', error);
    res.status(500).json({ error: 'Error fetching paginated transactions' });
  }
}

module.exports = {
  signup,
  loginEmail,
  profile,
  googleSignIn,
  logout,
  logoutAll,
  updateProfile,
  deleteUser,
  resetPassword,
  forgetPassword,
  paymentSuccess,
  inquirySuccess,
  fetchPaymentDetailsFromRazorPay,
  paginatedTransactions,
};

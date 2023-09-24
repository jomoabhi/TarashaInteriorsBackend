const express = require('express');
const router = new express.Router();
const auth = require('../middleware/authenticationMiddleware/auth.middleware');
const {
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
} = require('../controllers/user/user');
const UserRequestValidator = require('../middleware/requestValidator.middleware');
const userRequestValidatorobj = new UserRequestValidator();
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

router.post(
  '/users/signup',
  userRequestValidatorobj.validateSignupRequest,
  signup
);

router.post('/users/me', auth, profile);

router.post(
  '/users/login',
  userRequestValidatorobj.validateLoginRequest,
  loginEmail
);

router.post('/users/logout', auth, logout);

router.post('/users/logoutAll', auth, logoutAll);

router.patch('/users/me', auth, updateProfile);

router.delete('/users/me', auth, deleteUser);

router.post('/google-signin', googleSignIn);
router.post(
  '/payment-details',
  userRequestValidatorobj.validatePaymentDetailsAPI,
  fetchPaymentDetailsFromRazorPay
);
router.post(
  '/users/forget-password',
  userRequestValidatorobj.validateForgetPassword,
  forgetPassword
);
router.post('/users/reset-password', resetPassword);
router.post(
  '/payment-success-save-details',
  userRequestValidatorobj.validatePaymentSuccessRequest,
  auth,
  paymentSuccess
);
router.post('/save-user-inquiry', auth, inquirySuccess);

router.post('/transactions', auth, paginatedTransactions);
module.exports = router;

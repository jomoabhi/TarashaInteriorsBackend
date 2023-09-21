module.exports = validateRequest = (req, res, next) => {
  if (!req.body.date) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing date field' });
  }

  //   const date = new Date(req.body.date);

  const datePattern = /^\d{2}-\d{2}-\d{4}$/;
  const date = req.body.date;

  if (!datePattern.test(date)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid date format. Use MM-DD-YYYY' });
  }
  next();
};

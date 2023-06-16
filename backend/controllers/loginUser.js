//import th model
const User = require("../models/User");

//define route handler

exports.loginUser = async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      const response = await User.findOne(req.body).select("-password");

      if (response) {
        res.status(200).json({
          success: true,
          data: response,
          message: "User Found",
        });
      } else {
        res.status(200).json({
          success: false,
          data: { result: "No User Found" },
          message: "User Not Found",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        data: { result: "No User Found" },
        message: "User Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};

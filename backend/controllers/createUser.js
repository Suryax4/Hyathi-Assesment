//import th model
const User = require("../models/User");

//define route handler

exports.createUser = async (req, res) => {
  try {
    //extract title and desxcription from reauest body
    const { name, email, password } = req.body;
    //create a new Todo Obj and insert in DB
    let response = await User.create({ name, email, password });
    //send a json response with a success flag
    response = response.toObject();
    delete response.password;

    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
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

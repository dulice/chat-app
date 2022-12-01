const User = require("../models/UserModel");
const router = require("express").Router();

router.post("/signUp", async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    const user = new User({
      name,
      email,
      password,
      image,
    });
    const saveUser = await user.save();
    res.status(200).json(saveUser);
  } catch (error) {
    let message;
    if ((error.code = 11000)) {
      message = "User already exist";
    } else {
      message = error.message;
    }
    console.log(error);
    res.status(400).json(message);
  }
});

//login
router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online" ;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


module.exports = router;

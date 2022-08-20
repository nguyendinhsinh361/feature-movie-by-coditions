const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const authController = {
  register: async (req, res) => {
    const { username, name, password } = req.body;
    const userExists = await User.findOne({ username });

    if (!username || !name || !password) {
      res.status(400).json("Please add all fields");
    }
    if (userExists) {
      res.status(400).json("Tên tài khoản đã tồn tại");
    } else {
      const newUser = new User({
        username: username,
        name: name,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_KEY
        ).toString(),
      });
      try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },
  login: async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Sai tài khoản");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).json("Sai mật khẩu");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  },
};

module.exports = authController;

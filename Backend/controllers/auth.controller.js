const User = require("../models/user.model.js");
const ConnectionRequest = require("../models/connection.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Logo = require("../models/logo.model.js");
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.NODE_APP_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, skills, location, domain } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      skills,
      location,
      domain,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.uploadLogo = async (req, res) => {
  try {
    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Find the existing CommonLogo document, or create a new one if none exists
    let commonLogo = await Logo.findOne();
    if (!commonLogo) {
      commonLogo = new Logo();
    }

    // Update the existing or new CommonLogo document with the new logo data
    commonLogo.logo = req.file.buffer.toString("base64");
    await commonLogo.save();

    return res
      .status(201)
      .json({ message: "Logo uploaded successfully", logoId: commonLogo._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { skills, location, domain } = req.query;

    // Build the query based on the provided parameters
    const query = {};
    if (skills) query.skills = { $in: skills };
    if (location) query.location = location;
    if (domain) query.domain = domain;

    // Use the User model to find users based on the query
    const users = await User.find(query);

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.fetchConnectionRequests = async (req, res) => {
  try {
    const { userID } = req.params;

    // Check if the user exists
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ sender: userID }, { receiver: userID }],
    });

    res.json({ connectionRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

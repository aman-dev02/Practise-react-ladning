const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const userController = require("../controllers/auth.controller");
const ConnectionRequest = require("../models/connection.model");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const User = require("../models/user.model");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/search", userController.searchUsers);
router.get("/request/:userID", userController.fetchConnectionRequests);
router.post("/upload-logo", upload.single("logo"), userController.uploadLogo);

// Send Connection Request
router.post(
  "/users/:senderId/send-connection-request/:receiverId",
  async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;

      // Check if sender and receiver users exist
      const senderUser = await User.findById(senderId);
      const receiverUser = await User.findById(receiverId);

      if (!senderUser || !receiverUser) {
        return res
          .status(404)
          .json({ error: "Sender or receiver user not found" });
      }

      // Check if the connection request already exists
      const existingRequest = await ConnectionRequest.findOne({
        sender: senderId,
        receiver: receiverId,
        status: "pending",
      });

      if (existingRequest) {
        return res
          .status(400)
          .json({ error: "Connection request already sent" });
      }

      // Create a connection request
      const connectionRequest = new ConnectionRequest({
        sender: senderId,
        receiver: receiverId,
      });

      await connectionRequest.save();

      // Update the sender's connections
      senderUser.connections.push({ user: receiverId, status: "pending" });
      await senderUser.save();

      res.status(200).json({ message: "Connection request sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Accept Connection Request
router.post(
  "/users/:userId/accept-connection-request/:requestId",
  async (req, res) => {
    try {
      const { userId, requestId } = req.params;

      const connectionRequest = await ConnectionRequest.findById(requestId);

      if (!connectionRequest) {
        return res.status(404).json({ error: "Connection request not found" });
      }

      connectionRequest.status = "accepted";
      await connectionRequest.save();

      const senderUser = await User.findByIdAndUpdate(
        connectionRequest.sender,
        {
          $push: {
            connections: {
              user: connectionRequest.receiver,
              status: "accepted",
            },
          },
        },
        { new: true }
      );

      const receiverUser = await User.findByIdAndUpdate(
        connectionRequest.receiver,
        {
          $push: {
            connections: { user: connectionRequest.sender, status: "accepted" },
          },
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Connection request accepted successfully" });
    } catch (error) {
      console.error(error);
      Z;
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// Fetch Connection Requests for a User
router.get("/connection-requests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch all connection requests for the user
    const connectionRequests = await ConnectionRequest.find({
      receiver: userId,
      status: "pending",
    });

    // Fetch details of users who sent the requests
    const requestDetails = await Promise.all(
      connectionRequests.map(async (request) => {
        const senderUser = await User.findById(request.sender);
        return {
          requestId: request._id,
          senderId: senderUser._id,
          senderUsername: senderUser.username,
          // You can add more details as needed
        };
      })
    );

    res.status(200).json({ connectionRequests: requestDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const Patient = require("../Models/Patient");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body || {};

  if (typeof name !== "string" || name.trim().length < 3) {
    return res.status(400).json({ message: "Enter your full name." });
  }

  if (typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone.trim())) {
    return res.status(400).json({ message: "Enter a valid 10-digit mobile number." });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  if (
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      message: "Use at least 8 characters and at most 72 bytes for the password.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    await Patient.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
    });

    return res.status(201).json({
      message: "Account created. Sign in with your registered mobile number.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email or mobile number is already registered.",
      });
    }

    return res.status(500).json({ message: "Could not create the account." });
  }
});

module.exports = router;
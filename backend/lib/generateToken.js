import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "35d",
  });

  res.cookie("jwt", token, {
    maxAge: 35 * 24 * 60 * 60 * 1000, //35 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set secure flag in production
    sameSite: "strict",
  });
};

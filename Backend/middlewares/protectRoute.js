const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const getTokenFromRequest = (req) => {
	console.log('Request cookies:', req.cookies);
	console.log('Request headers:', req.headers);
	
	// Parse cookies manually if req.cookies is undefined
	if (!req.cookies && req.headers.cookie) {
	  const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
		const [key, value] = cookie.trim().split('=');
		acc[key] = value;
		return acc;
	  }, {});
	  if (cookies.jwt) {
		console.log('Token found in manually parsed cookies');
		return cookies.jwt;
	  }
	}
	
	if (req.cookies && req.cookies.jwt) {
	  console.log('Token found in req.cookies');
	  return req.cookies.jwt;
	}
	
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer ')) {
	  console.log('Token found in Authorization header');
	  return authHeader.split(' ')[1];
	}
	
	console.log('No token found');
	return null;
  };

// Add the getTokenFromRequest function here
const protectRoute = async (req, res, next) => {
	console.log('Request cookies:', req.cookies);
	console.log('Request headers:', req.headers);
	
	try {
	  const token = getTokenFromRequest(req);
	  
	  if (!token) {
		return res.status(401).json({ message: "Unauthorized - No token provided" });
	  }
	  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  
	  const decoded = jwt.verify(token, process.env.JWT_SECRET);
	  console.log("Decoded token:", decoded);
  
	  const user = await User.findById(decoded.userId).select("-password");
  
	  if (!user) {
		return res.status(404).json({ message: "User not found" });
	  }
  
	  req.user = user;
	  next();
	} catch (err) {
	  console.error("Error in protectRoute: ", err);
	  res.status(500).json({ message: "Internal server error", error: err.message });
	}
  };

  module.exports = protectRoute;

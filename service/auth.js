const jwt = require("jsonwebtoken");
const secret = "Rahul@143";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

const authenticateToken = (req, res, next) => {
  const token = req.cookie.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, secret);
    req.user = user; // Set user data in the request object
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { setUser, getUser, authenticateToken };

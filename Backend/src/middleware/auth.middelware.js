import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1. get header
    const authHeader = req.headers.authorization;

    // 2. check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 3. extract token
    const token = authHeader.split(" ")[1];

    // 4. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. attach user to request
    req.user = decoded;

    // 6. move forward
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
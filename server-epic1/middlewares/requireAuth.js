import pkg from 'jsonwebtoken';
import { user } from '../models/user';

const { verify } = pkg;

const requireAuth = (requiredRole = null) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1]; // Extract token

    try {
      // Verify the token and extract user information
      const { _id, role } = verify(token, process.env.SECRET);
      req.user = await user.findOne({ _id }).select("_id role");

      // Check if the role matches the required role
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: "You do not have the required permissions" });
      }

      // Attach role to the request object
      req.user.role = role;
      next(); // Proceed to the next middleware or route
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

export default requireAuth;

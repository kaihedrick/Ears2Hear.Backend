import { JwtPayload } from './auth'; // Import the JwtPayload type

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Use JwtPayload instead of a generic user type
    }
  }
}

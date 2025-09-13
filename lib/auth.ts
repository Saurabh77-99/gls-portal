import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TokenPayload } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

export const hashAccessCode = async (accessCode: string): Promise<string> => {
  return await bcrypt.hash(accessCode, 12);
};

export const verifyAccessCode = async (
  accessCode: string,
  hashedCode: string
): Promise<boolean> => {
  return await bcrypt.compare(accessCode, hashedCode);
};

export const generateToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: "24h",
    issuer: "gls-placement-portal"
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "gls-placement-portal"
    });
    return decoded as TokenPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
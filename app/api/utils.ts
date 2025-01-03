import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function makeQuery(query: string) {
  const index = query.indexOf("?");
  if (index === -1) return {};
  const queryString = query.slice(index);
  const queries = Object.fromEntries(new URLSearchParams(queryString));
  console.log("queries", queries);
  if (queries?.userId) queries.userId = Number(queries?.userId);
  return queries;
}

const secret = process.env.JWT_SECRET || "your-secret-key";

export const signToken = (payload: object) => {
  return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "2d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Verification failed:", error);
    return null;
  }
};

export const verifyUser = (req: NextRequest) => {
  const token = req.headers?.get("authorization")?.split(" ")[1];

  if (!token) return req.headers.set("tokenId", undefined);
  const decoded = verifyToken(token) as { userId: number } | null;

  if (decoded) {
    return req.headers.set("tokenId", decoded.userId);
  } else return req.headers.set("tokenId", null);
};

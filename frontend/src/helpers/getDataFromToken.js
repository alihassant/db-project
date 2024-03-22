import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function getDataFromToken(request) {
  try {
    const token = request.cookies.get("token")?.value;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.userId;
    return userId;
  } catch (err) {
    console.log(err);
  }
}

export function getToken(request) {
  try {
    const token = request.cookies.get("token")?.value;
    return token;
  } catch (err) {
    console.log(err);
  }
}

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export default function getTokenValue() {
  try {
    const token = Cookies.get("token");
    return token;
  } catch (err) {
    console.log(err);
  }
}

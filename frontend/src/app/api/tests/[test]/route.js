import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  const res = await axios.get(`http://localhost:8080/api/auth/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = res.data;
  return NextResponse.json(user);
}

export async function getUserData(userId) {
  const res = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);

  // console.log(res.data);

  return res.data;
}

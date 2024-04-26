import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = await getDataFromToken(request);
  const token = request.cookies.get("token")?.value;
  const res = await axios.get(
    `http://localhost:8080/api/user/getTodos/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res.status === 200);
  const todos = res.data;
  return NextResponse.json(todos);
}

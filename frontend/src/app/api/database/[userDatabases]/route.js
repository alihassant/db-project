import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  const userId = await getDataFromToken(request);
  // console.log(userId);
  const res = await axios.get(
    `http://localhost:8080/api/user/getUserDatabases/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const databases = res.data;
  // console.log(res);
  // console.log("db length", databases.length);
  // if (databases.length === 0) {
  //   throw new Error("Could not retrieve the databases for the user");
  // }
  return NextResponse.json(databases);
}

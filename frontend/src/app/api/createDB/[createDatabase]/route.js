import getDataFromToken from "@/helpers/getDataFromToken";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { db } = await req.json(); // assuming the request body contains the "db" object
  console.log("/api/db:", db);
  try {
    const token = req.cookies.get("token")?.value; // assuming the token is stored in a cookie
    // console.log(req.text());
    // console.log(req.body);

    const url = `http://localhost:8080/api/db/createDatabase`;
    const payload = { ...db };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard"); // Revalidate the dashboard page (or any other page as per your requirement)

    // Send the response back to the client
    res.status(200).json({ message: response.data.message });
    NextResponse.json({ message: response.data.message });
  } catch (err) {
    // Handle error if any
    res.status(500).json({ message: err.response.data.message });
  }
}

export async function GET(request) {
  const userId = await getDataFromToken(request);
  const token = request.cookies.get("token")?.value;
  const res = await axios.get(`http://localhost:8080/api/auth/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = res.data;
  return NextResponse.json(user);
}

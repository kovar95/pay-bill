import { Person } from "@/types/Person";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
): Promise<NextResponse<{ person: Person }>> {
  const requestData = await request.json();

  const res = await axios.post(
    `https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users`,
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json({ person: res.data });
}

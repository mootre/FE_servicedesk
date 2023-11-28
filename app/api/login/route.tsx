export function assignasset(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/addasset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}


/*import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
  
    const { username, password } = body;
  
    if (username !== "admin" || password !== "admin") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
  
    // Always check this
    const secret = process.env.JWT_SECRET || "";
  
    const token = sign(
      {
        username,
      },
      "123456",
      {
        expiresIn: 60*1,
      }
    );
  
    const seralized = serialize("JWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60*1,
    });
  
    const response = {
      message: "Authenticated!",
    };
  
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": seralized },
    });
  }*/
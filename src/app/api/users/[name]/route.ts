import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const name = NextRequest.name;

  console.log(name);

  return NextResponse.json({ name: "lucas" });
}

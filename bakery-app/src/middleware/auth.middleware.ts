import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authMiddleware(req: any, roles: string[]) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (!roles.includes(decoded.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return decoded;
}

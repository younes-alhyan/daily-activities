import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET!;
const USERNAME = process.env.USERNAME!;
const PASSWORD = process.env.PASSWORD!;

export const POST = async (req: Request) => {
    const body = await req.json();
    if (body.username === USERNAME && body.password === PASSWORD) {
        const token = jwt.sign({ username: USERNAME }, TOKEN_SECRET, { expiresIn: "7d" });
        return NextResponse.json({ token });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
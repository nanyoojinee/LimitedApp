// pages/api/login.js
import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library"; // google-auth-library 추가

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request) {
    const { token } = await request.json();

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    }

    try {
        const user = await verify();
        if (!user) throw new Error('User verification failed');
        return NextResponse.json({ message: "Login successful", user });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}

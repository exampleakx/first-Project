import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password || password.length < 8) {
      return Response.json({ message: "Please enter a valid name, email, and password." }, { status: 400 });
    }

    await connectDB();
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) {
      return Response.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
    });
    return Response.json({ message: "Account created." }, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);
    return Response.json({ message: "Unable to create account." }, { status: 500 });
  }
}

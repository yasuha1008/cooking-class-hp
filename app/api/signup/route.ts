import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, ensureSchema } from "@/lib/db";

export async function POST(req: Request) {
  const { email, password, name } = (await req.json()) as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "お名前・メールアドレス・パスワードをすべて入力してください。" },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "パスワードは8文字以上にしてください。" },
      { status: 400 }
    );
  }

  await ensureSchema();

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (existing.length > 0) {
    return NextResponse.json(
      { error: "このメールアドレスはすでに登録されています。" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${passwordHash}, ${name})
  `;

  return NextResponse.json({ ok: true });
}

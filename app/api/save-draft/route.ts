import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { DraftSchema, type DraftInput } from "@/lib/zodSchemas";

export async function POST(request: NextRequest) {
  let payload: DraftInput;
  try {
    const json = await request.json();
    payload = DraftSchema.parse(json);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid draft";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? request.ip ?? "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  const submission = await prisma.submission.create({
    data: {
      locale: payload.locale ?? "en",
      consent: false,
      durationSec: Math.floor((Date.now() - (payload.startedAt ?? Date.now())) / 1000),
      ipHash,
      payload,
      status: "DRAFT"
    }
  });

  return NextResponse.json({ id: submission.id });
}

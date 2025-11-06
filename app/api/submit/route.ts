import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { rateLimit } from "@/lib/rateLimit";
import { SubmissionSchema, type SubmissionInput } from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
import { normalizeSubmission } from "@/lib/normalizers";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? request.ip ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let payload: SubmissionInput;
  try {
    const json = await request.json();
    payload = SubmissionSchema.parse(json);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const durationSec = Math.floor((Date.now() - payload.startedAt) / 1000);
  if (durationSec < 15) {
    return NextResponse.json({ error: "validation.duration" }, { status: 400 });
  }

  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
  const normalized = normalizeSubmission(payload);

  const submission = await prisma.submission.create({
    data: {
      locale: payload.locale,
      consent: payload.consent,
      durationSec,
      ipHash,
      payload: normalized,
      status: "SUBMITTED"
    }
  });

  if (resend && process.env.NOTIFY_EMAIL) {
    const summaryLines = [
      `Name: ${payload.personal.fullName}`,
      `Locale: ${payload.locale}`,
      `Goals: ${payload.goals.goals.join(", ")}`
    ].join("\n");
    await resend.emails.send({
      from: "PodiumX <noreply@podiumx.app>",
      to: process.env.NOTIFY_EMAIL,
      subject: "New nutrition questionnaire submission",
      text: summaryLines
    });
  }

  return NextResponse.json({ id: submission.id });
}

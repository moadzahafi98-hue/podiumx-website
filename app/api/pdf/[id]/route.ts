import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubmissionPDF } from "@/lib/pdf";
import { SubmissionInput } from "@/lib/zodSchemas";
import { renderToStream } from "@react-pdf/renderer";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const submission = await prisma.submission.findUnique({ where: { id: params.id } });
  if (!submission) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const payload = submission.payload as SubmissionInput;
  const pdfStream = await renderToStream(<SubmissionPDF input={payload} id={submission.id} />);

  return new NextResponse(pdfStream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="submission-${submission.id}.pdf"`
    }
  });
}

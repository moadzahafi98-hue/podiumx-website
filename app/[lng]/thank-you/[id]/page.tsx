import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";
import "dayjs/locale/ar";
import { prisma } from "@/lib/prisma";
import { type Language } from "@/lib/i18n-config";
import { Button } from "@/components/ui/button";
import { getFixedT } from "@/lib/i18n";

dayjs.extend(localizedFormat);

interface Props {
  params: { lng: Language; id: string };
}

export default async function ThankYouPage({ params }: Props) {
  const { lng, id } = params;
  const submission = await prisma.submission.findUnique({ where: { id } });
  if (!submission) {
    notFound();
  }
  const t = await getFixedT(lng);
  const submittedAt = dayjs(submission.createdAt).locale(lng).format("LLL");
  const payload = submission.payload as Record<string, any>;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">{t("success.title")}</h1>
          <p className="text-slate-600">{t("success.desc", { id: submission.id })}</p>
          <p className="text-sm text-slate-500">{t("summary.submitted", { date: submittedAt })}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            className="print:hidden"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            {t("success.print")}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/api/pdf/${submission.id}`}>{t("success.download")}</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/${lng}`}>{t("success.back")}</Link>
          </Button>
        </div>
      </div>
      <section className="mt-8 space-y-4 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">{t("summary.title")}</h2>
          <p className="text-slate-600">{t("summary.subtitle")}</p>
        </header>
        <div className="grid gap-6">
          {Object.entries(payload).map(([sectionKey, value]) => (
            <article key={sectionKey} className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">{sectionKey}</h3>
              <div className="space-y-1 text-sm text-slate-700">
                {renderSummary(value)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function renderSummary(value: unknown): ReactNode {
  if (!value) return <p>—</p>;
  if (Array.isArray(value)) {
    if (value.length === 0) return <p>—</p>;
    return <p>{value.join(", ")}</p>;
  }
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).map(([key, val]) => (
      <p key={key}>
        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}:</span> {formatValue(val)}
      </p>
    ));
  }
  return <p>{String(value)}</p>;
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value ?? "";
}

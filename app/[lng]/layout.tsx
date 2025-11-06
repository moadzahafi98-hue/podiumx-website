import type { ReactNode } from "react";
import { dir } from "i18next";
import { languages, type Language } from "@/lib/i18n-config";
import { TranslationProvider } from "@/components/translation-provider";
import { Toaster } from "sonner";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

async function loadResources(lng: Language) {
  const common = (await import(`@/locales/${lng}/common.json`)).default;
  return { common };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { lng: Language };
}) {
  const { lng } = params;
  const direction = dir(lng);
  const resources = await loadResources(lng);

  return (
    <html lang={lng} dir={direction} suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900">
        <TranslationProvider locale={lng} resources={resources}>
          <div className="min-h-screen">{children}</div>
          <Toaster richColors position="top-center" dir={direction} />
        </TranslationProvider>
      </body>
    </html>
  );
}

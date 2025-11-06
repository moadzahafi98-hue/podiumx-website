import Link from "next/link";

const links = [
  { href: "/en/form", label: "English" },
  { href: "/fr/form", label: "Français" },
  { href: "/ar/form", label: "العربية" }
];

export default function MarketingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-brand">PodiumX Nutrition</p>
        <h1 className="text-4xl font-semibold">Ultra-Detailed Nutrition & Lifestyle Questionnaire</h1>
        <p className="text-lg text-slate-600">
          Choose your preferred language to begin the comprehensive intake form for
          personalized nutrition coaching.
        </p>
      </header>
      <nav className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 bg-white px-6 py-8 text-center text-lg font-medium shadow-sm transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}

# PodiumX Nutrition Intake

A multilingual, accessible Next.js application for the "Ultra-Detailed Nutrition & Lifestyle Questionnaire" supporting English, French, and Arabic (RTL) locales.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm, npm, or yarn

### Installation

```bash
pnpm install
# or npm install
```

### Environment

Copy `.env.example` to `.env.local` and set the values:

```
DATABASE_URL="file:./dev.db"
DATABASE_PROVIDER="sqlite"
RESEND_API_KEY="" # optional for email notifications
NOTIFY_EMAIL="" # email address to notify when using Resend
RATE_LIMIT_WINDOW_MINUTES=60
RATE_LIMIT_MAX_REQUESTS=10
```

### Database

```bash
npx prisma migrate dev --name init
```

### Development

```bash
pnpm dev
```

Navigate to `http://localhost:3000` and choose a locale to access the form.

### Production Build

```bash
pnpm build
pnpm start
```

## Internationalization

- Locale detection is performed via the URL prefix (`/en`, `/fr`, `/ar`).
- Translations reside in `locales/<lng>/common.json`.
- RTL layout activates automatically for Arabic.

To add a new language:

1. Create `locales/<lng>/common.json` mirroring the English keys.
2. Update `lib/i18n-config.ts` with the new language code.
3. Ensure Tailwind styles account for direction where needed.

## Form Features

- Multi-step navigation with progress indicator and autosave (localStorage + optional server drafts).
- Zod + react-hook-form validation on client and server.
- Unit toggles (metric/imperial) with conversion handled during submission.
- Anti-spam: honeypot, minimum time-to-complete, and IP rate limiting.
- Prisma persistence with normalized payloads.
- Thank-you page with printable summary and PDF export via `@react-pdf/renderer`.
- Optional email notifications through Resend when `RESEND_API_KEY` and `NOTIFY_EMAIL` are configured.

## Testing

Playwright fixtures can target `/en/form`, `/fr/form`, and `/ar/form` to verify locale-specific rendering. Example selectors rely on translated labels (see `locales` folder).

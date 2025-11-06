import { createDefaultValues } from "@/lib/default-values";
import { type Language } from "@/lib/i18n-config";
import { FormClient } from "./FormClient";

export default function FormPage({ params }: { params: { lng: Language } }) {
  const { lng } = params;
  const defaultValues = createDefaultValues(lng);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
      <FormClient locale={lng} defaultValues={defaultValues} />
    </main>
  );
}

"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface SaveDraftProps {
  onSave: () => Promise<void>;
}

export function SaveDraft({ onSave }: SaveDraftProps) {
  const { t } = useTranslation();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => startTransition(onSave)}
      disabled={pending}
    >
      {pending ? t("draft.saving") : t("nav.saveDraft")}
    </Button>
  );
}

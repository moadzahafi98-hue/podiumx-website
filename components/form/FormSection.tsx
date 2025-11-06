"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  visible: boolean;
  dir?: "ltr" | "rtl";
}

export function FormSection({ title, description, children, visible, dir = "ltr" }: FormSectionProps) {
  return (
    <motion.section
      aria-hidden={!visible}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.2 }}
      className={cn("space-y-6", !visible && "hidden")}
      dir={dir}
    >
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-slate-600">{description}</p> : null}
      </header>
      <div className="space-y-6">{children}</div>
    </motion.section>
  );
}

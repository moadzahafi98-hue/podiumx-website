import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { SubmissionInput } from "./zodSchemas";
import { normalizeSubmission } from "./normalizers";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: "Helvetica"
  },
  heading: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 700
  },
  section: {
    marginBottom: 16
  },
  label: {
    fontWeight: 600
  },
  field: {
    marginBottom: 4
  }
});

interface SubmissionPDFProps {
  input: SubmissionInput;
  id: string;
}

export function SubmissionPDF({ input, id }: SubmissionPDFProps) {
  const normalized = normalizeSubmission(input);
  const createdAt = dayjs().format("YYYY-MM-DD HH:mm");
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>PodiumX Nutrition</Text>
          <Text>Submission ID: {id}</Text>
          <Text>Submitted: {createdAt}</Text>
          <Text>Locale: {input.locale}</Text>
        </View>
        {Object.entries(normalized).map(([section, value]) => {
          if (section === "locale" || section === "consent") return null;
          return (
            <View key={section} style={styles.section}>
              <Text style={styles.label}>{section.toUpperCase()}</Text>
              {renderSection(value)}
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

function renderSection(value: unknown): JSX.Element {
  if (!value) {
    return <Text style={styles.field}>—</Text> as unknown as JSX.Element;
  }
  if (Array.isArray(value)) {
    return <Text style={styles.field}>{value.join(", ")}</Text> as unknown as JSX.Element;
  }
  if (typeof value === "object") {
    return (
      <View>
        {Object.entries(value as Record<string, unknown>).map(([key, child]) => (
          <View key={key} style={styles.field}>
            <Text>
              {key}: {formatValue(child)}
            </Text>
          </View>
        ))}
      </View>
    ) as unknown as JSX.Element;
  }
  return <Text style={styles.field}>{String(value)}</Text> as unknown as JSX.Element;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

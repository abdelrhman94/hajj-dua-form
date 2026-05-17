import { notFound } from "next/navigation";
import { readEntries } from "@/lib/storage";
import AdminClient from "./AdminClient";

interface PageProps {
  params: Promise<{ secret: string }>;
}

export default async function AdminPage({ params }: PageProps) {
  const { secret } = await params;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || secret !== adminSecret) {
    notFound();
  }

  const entries = await readEntries();

  return <AdminClient entries={entries} secretKey={secret} />;
}

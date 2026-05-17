import { NextRequest, NextResponse } from "next/server";
import { readEntries, addEntry, deleteEntry } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const secret = process.env.ADMIN_SECRET;

  if (!secret || key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await readEntries();
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, duas } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "الاسم مطلوب" },
        { status: 400 }
      );
    }

    if (!Array.isArray(duas) || duas.length === 0) {
      return NextResponse.json(
        { error: "الدعوات مطلوبة" },
        { status: 400 }
      );
    }

    const sanitizedDuas = duas
      .filter((d): d is string => typeof d === "string")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    if (sanitizedDuas.length === 0) {
      return NextResponse.json(
        { error: "الدعوات مطلوبة" },
        { status: 400 }
      );
    }

    const entry = await addEntry(name.trim(), sanitizedDuas);
    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const secret = process.env.ADMIN_SECRET;

  if (!secret || key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id || typeof id !== "number") {
      return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });
    }

    const deleted = await deleteEntry(id);
    if (!deleted) {
      return NextResponse.json({ error: "لم يتم العثور على الدعاء" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}

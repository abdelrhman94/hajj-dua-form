"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import type { DuaEntry } from "@/lib/types";

interface AdminClientProps {
  entries: DuaEntry[];
  secretKey: string;
}

export default function AdminClient({
  entries: initialEntries,
  secretKey,
}: AdminClientProps) {
  const [entries, setEntries] = useState(initialEntries);
  const [showAll, setShowAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const visibleEntries = showAll ? entries : entries.slice(-5);

  const refreshEntries = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/duas?key=${secretKey}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch {
      // silently fail
    } finally {
      setRefreshing(false);
    }
  };

  const exportToExcel = () => {
    const rows: Record<string, string>[] = [];
    entries.forEach((entry) => {
      entry.duas.forEach((dua, i) => {
        rows.push({
          الاسم: i === 0 ? entry.name : "",
          الدعاء: dua,
          "وقت الإرسال": i === 0 ? entry.submittedAt : "",
        });
      });
      rows.push({ الاسم: "", الدعاء: "", "وقت الإرسال": "" });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 25 }, { wch: 40 }, { wch: 22 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "دعوات الحجاج");
    XLSX.writeFile(wb, "دعوات_الحج_1446.xlsx");
  };

  const totalDuas = entries.reduce((sum, e) => sum + e.duas.length, 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#2d1a00_0%,#1a1208_60%)] relative overflow-hidden pb-15">
      {/* Decorative background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="text-center pt-12 pb-8 px-6 relative z-1">
        <div className="text-[52px] mb-2">📋</div>
        <h1 className="text-gold text-[clamp(1.8rem,5vw,2.8rem)] font-black mb-2 tracking-tight [text-shadow:0_0_40px_rgba(201,168,76,0.33)]">
          الدعوات المستلمة
        </h1>
        <p className="text-gold/50 text-base">
          إدارة جميع الدعوات التي تم إرسالها
        </p>
        <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mt-5" />
      </div>

      {/* Stats */}
      <div className="max-w-[680px] mx-auto px-4 relative z-1">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 border border-gold/20 rounded-2xl p-5 text-center backdrop-blur-sm">
            <div className="text-3xl font-black text-gold">{entries.length}</div>
            <div className="text-gold/60 text-sm mt-1">عدد الأشخاص</div>
          </div>
          <div className="bg-white/5 border border-gold/20 rounded-2xl p-5 text-center backdrop-blur-sm">
            <div className="text-3xl font-black text-gold">{totalDuas}</div>
            <div className="text-gold/60 text-sm mt-1">إجمالي الدعوات</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={refreshEntries}
            disabled={refreshing}
            className="flex-1 py-3 px-5 bg-white/10 border border-gold/30 text-gold rounded-xl font-bold cursor-pointer text-[0.9rem] transition-all hover:bg-white/15 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {refreshing ? "جارٍ التحديث..." : "🔄 تحديث"}
          </button>
          <button
            onClick={exportToExcel}
            disabled={entries.length === 0}
            className="flex-1 py-3 px-5 bg-green text-white border-none rounded-xl font-bold cursor-pointer text-[0.9rem] transition-all hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            📥 تحميل Excel
          </button>
        </div>

        {/* Entries list */}
        {entries.length === 0 ? (
          <div className="bg-white/5 border border-gold/20 rounded-2xl p-10 text-center backdrop-blur-sm">
            <div className="text-4xl mb-3">🤲</div>
            <p className="text-gold/60 text-lg">لا توجد دعوات حتى الآن</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-gold/20 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex flex-col gap-3">
              {visibleEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl p-3.5 px-4.5 border-r-4 border-r-gold"
                >
                  <div className="flex justify-between mb-2 flex-wrap gap-1">
                    <span className="font-extrabold text-dark text-base">
                      {entry.name}
                    </span>
                    <span className="text-gray-400 text-[0.78rem]">
                      {entry.submittedAt}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.duas.map((dua) => (
                      <span
                        key={dua}
                        className="bg-chip-bg border border-gold/40 rounded-[20px] py-1 px-3 text-[0.82rem] text-brown"
                      >
                        {dua}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {entries.length > 5 && (
              <button
                onClick={() => setShowAll((p) => !p)}
                className="mt-3.5 w-full bg-transparent border border-gold/30 text-gold py-2 px-5 rounded-lg cursor-pointer text-[0.9rem] transition-all hover:bg-white/5"
              >
                {showAll
                  ? "عرض أقل ▲"
                  : `عرض الكل (${entries.length}) ▼`}
              </button>
            )}
          </div>
        )}

        <p className="text-center text-gold/40 text-[0.82rem] mt-7">
          تقبل الله منا ومنكم الطاعات 🌙
        </p>
      </div>
    </div>
  );
}

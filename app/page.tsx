"use client";

import { useState } from "react";

const DUA_SUGGESTIONS = [
  "الشفاء من المرض",
  "الرزق الحلال",
  "الزواج السعيد",
  "النجاح في الدراسة",
  "الهداية والتوبة",
  "السلامة والعافية",
  "الذرية الصالحة",
  "الفرج من الهموم",
  "المغفرة وستر العيوب",
  "السداد في الدين",
  "الرحمة بالوالدين",
  "النجاح في العمل",
];

export default function Home() {
  const [name, setName] = useState("");
  const [customDua, setCustomDua] = useState("");
  const [selectedDuas, setSelectedDuas] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleDua = (dua: string) => {
    setSelectedDuas((prev) =>
      prev.includes(dua) ? prev.filter((d) => d !== dua) : [...prev, dua]
    );
  };

  const addCustomDua = () => {
    const trimmed = customDua.trim();
    if (trimmed && !selectedDuas.includes(trimmed)) {
      setSelectedDuas((prev) => [...prev, trimmed]);
      setCustomDua("");
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || selectedDuas.length === 0 || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/duas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), duas: [...selectedDuas] }),
      });

      if (res.ok) {
        setName("");
        setSelectedDuas([]);
        setCustomDua("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError("حدث خطأ أثناء الإرسال، حاول مرة أخرى");
        setTimeout(() => setError(""), 4000);
      }
    } catch {
      setError("تعذر الاتصال بالخادم، تحقق من اتصالك بالإنترنت");
      setTimeout(() => setError(""), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const isDisabled = !name.trim() || selectedDuas.length === 0 || submitting;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#2d1a00_0%,#1a1208_60%)] relative overflow-hidden pb-15">
      {/* Decorative background pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="text-center pt-12 pb-8 px-6 relative z-1">
        <div className="text-[52px] mb-2">🕌</div>
        <h1 className="text-gold text-[clamp(1.8rem,5vw,2.8rem)] font-black mb-2 tracking-tight [text-shadow:0_0_40px_rgba(201,168,76,0.33)]">
          دعواتكم أمانة عندي
        </h1>
        <p className="text-gold/50 text-base">
          سأحملها معي إلى البيت الحرام إن شاء الله ❤️
        </p>
        <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mt-5" />
      </div>

      {/* Main form card */}
      <div className="max-w-[680px] mx-auto px-4 relative z-1">
        <div className="bg-card rounded-[20px] p-7 shadow-[0_0_0_1px_rgba(201,168,76,0.2),0_24px_80px_rgba(0,0,0,0.4)] mb-6">
          {/* Name */}
          <div className="mb-5">
            <label className="block mb-1.5 font-bold text-brown text-[0.95rem]">
              اسمك الكريم *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك هنا..."
              className="w-full py-2.5 px-3.5 rounded-[10px] border-2 border-[#e8d5a3] text-[0.95rem] text-[#2a1800] bg-white transition-colors"
            />
          </div>

          {/* Dua suggestions */}
          <div className="mb-5">
            <label className="block mb-1.5 font-bold text-brown text-[0.95rem]">
              اختر دعواتك 🤲
            </label>
            <div className="flex flex-wrap gap-2.5 mt-2">
              {DUA_SUGGESTIONS.map((dua) => {
                const active = selectedDuas.includes(dua);
                return (
                  <button
                    key={dua}
                    onClick={() => toggleDua(dua)}
                    className={`py-2 px-4 rounded-full border-2 text-[0.88rem] cursor-pointer transition-all duration-200 ${
                      active
                        ? "border-green bg-green text-white font-bold"
                        : "border-gold/30 bg-transparent text-brown hover:border-gold/60"
                    }`}
                  >
                    {dua}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom dua */}
          <div className="mb-7">
            <label className="block mb-1.5 font-bold text-brown text-[0.95rem]">
              أو أضف دعاء خاص
            </label>
            <div className="flex items-end gap-2 mt-1.5">
              <textarea
                value={customDua}
                onChange={(e) => setCustomDua(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addCustomDua();
                  }
                }}
                placeholder="اكتب دعاءك هنا..."
                rows={4}
                className="flex-1 py-2.5 px-3.5 rounded-[10px] border-2 border-[#e8d5a3] text-[0.95rem] text-[#2a1800] bg-white transition-colors resize-none"
              />
              <button
                onClick={addCustomDua}
                className="h-10 px-4.5 bg-gold text-dark border-none rounded-[10px] font-bold cursor-pointer text-base whitespace-nowrap hover:brightness-110 transition-all"
              >
                + أضف
              </button>
            </div>

            {/* Selected duas chips */}
            {selectedDuas.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-2">
                {selectedDuas.map((dua) => (
                  <span
                    key={dua}
                    className="inline-flex items-center gap-1.5 bg-chip-bg border border-gold/50 rounded-[20px] py-1 px-3 text-[0.85rem] text-brown"
                  >
                    {dua}
                    <span
                      onClick={() => toggleDua(dua)}
                      className="cursor-pointer text-red-700 font-bold leading-none hover:text-red-900"
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`w-full py-4 border-none rounded-xl text-[1.1rem] font-black transition-all duration-200 ${
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-linear-to-br from-gold to-gold-light text-dark cursor-pointer shadow-[0_8px_24px_rgba(201,168,76,0.33)] hover:brightness-105 active:scale-[0.99]"
            }`}
          >
            {submitting ? "جارٍ الإرسال..." : "🤍 أرسل دعواتك"}
          </button>

          {submitted && (
            <div className="mt-4 py-3 px-4 bg-green-100 border border-green-500 rounded-[10px] text-green-800 text-center font-bold text-[0.95rem]">
              ✅ تم استلام دعواتك، جزاك الله خيراً وبارك فيك!
            </div>
          )}

          {error && (
            <div className="mt-4 py-3 px-4 bg-red-50 border border-red-400 rounded-[10px] text-red-700 text-center font-bold text-[0.95rem]">
              ❌ {error}
            </div>
          )}
        </div>

        <p className="text-center text-gold/40 text-[0.82rem] mt-7">
          تقبل الله منا ومنكم الطاعات 🌙
        </p>
      </div>
    </div>
  );
}

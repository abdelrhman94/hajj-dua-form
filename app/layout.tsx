import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "دعواتكم أمانة عندي",
  description:
    "سأحملها معي إلى البيت الحرام إن شاء الله ❤️ أرسل لي دعواتك وأنا أدعيها لك في الحرم",
  openGraph: {
    title: "دعواتكم أمانة عندي 🕌",
    description:
      "سأحملها معي إلى البيت الحرام إن شاء الله ❤️ أرسل لي دعواتك وأنا أدعيها لك في الحرم",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "دعواتكم أمانة عندي 🕌",
    description:
      "سأحملها معي إلى البيت الحرام إن شاء الله ❤️ أرسل لي دعواتك وأنا أدعيها لك في الحرم",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen font-(family-name:--font-cairo)">
        {children}
      </body>
    </html>
  );
}

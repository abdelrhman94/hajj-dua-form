const BASE_URL = process.argv[2] || "http://localhost:3000";
const NUM_USERS = parseInt(process.argv[3] || "50");

const NAMES = [
  "أحمد", "محمد", "فاطمة", "عائشة", "خالد",
  "سارة", "عمر", "مريم", "يوسف", "نور",
  "علي", "هند", "إبراهيم", "ليلى", "عبدالله",
  "رنا", "حسن", "دينا", "سعد", "لمياء",
];

const DUAS = [
  "الشفاء من المرض",
  "الرزق الحلال",
  "الزواج السعيد",
  "النجاح في الدراسة",
  "الهداية والتوبة",
  "السلامة والعافية",
  "الذرية الصالحة",
  "الفرج من الهموم",
  "المغفرة وستر العيوب",
  "النجاح في العمل",
  "اللهم اشفي مرضانا",
  "اللهم ارحم موتانا",
];

function randomPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function sendDua(index: number) {
  const name = NAMES[index % NAMES.length] + ` ${index + 1}`;
  const duas = randomPick(DUAS, Math.floor(Math.random() * 4) + 1);

  const start = Date.now();
  try {
    const res = await fetch(`${BASE_URL}/api/duas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, duas }),
    });
    const elapsed = Date.now() - start;

    if (res.ok) {
      console.log(`✅ #${index + 1} ${name} (${elapsed}ms) - ${duas.length} duas`);
    } else {
      const err = await res.text();
      console.log(`❌ #${index + 1} ${name} (${elapsed}ms) - ${res.status}: ${err}`);
    }
    return { success: res.ok, elapsed };
  } catch (err) {
    const elapsed = Date.now() - start;
    console.log(`💥 #${index + 1} ${name} (${elapsed}ms) - ${err}`);
    return { success: false, elapsed };
  }
}

async function main() {
  console.log(`\n🧪 Load test: ${NUM_USERS} users → ${BASE_URL}\n`);

  const start = Date.now();
  const promises = Array.from({ length: NUM_USERS }, (_, i) => sendDua(i));
  const results = await Promise.all(promises);
  const totalTime = Date.now() - start;

  const success = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const avgTime = Math.round(
    results.reduce((sum, r) => sum + r.elapsed, 0) / results.length
  );
  const maxTime = Math.max(...results.map((r) => r.elapsed));

  console.log(`\n${"─".repeat(40)}`);
  console.log(`📊 Results:`);
  console.log(`   Total users:    ${NUM_USERS}`);
  console.log(`   Successful:     ${success} ✅`);
  console.log(`   Failed:         ${failed} ❌`);
  console.log(`   Total time:     ${totalTime}ms`);
  console.log(`   Avg response:   ${avgTime}ms`);
  console.log(`   Max response:   ${maxTime}ms`);
  console.log(`${"─".repeat(40)}\n`);
}

main();

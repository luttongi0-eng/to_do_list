export function formatKoreanDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const days = ["일","월","화","수","목","금","토"];
    const dayOfWeek = days[d.getDay()];

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${year}.${month}.${day}(${dayOfWeek}) ${ampm} ${hours}:${minutes}`;
  } catch {
    return dateStr;
  }
}

export function getCurrentDateTimeFormatted(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function calculateDDay(targetDateStr?: string): { text: string; isPast: boolean } | null {
  if (!targetDateStr) return null;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return { text: 'D-Day', isPast: false };
    } else if (diffDays > 0) {
      return { text: `D-${diffDays}`, isPast: false };
    } else {
      return { text: `D+${Math.abs(diffDays)}`, isPast: true };
    }
  } catch {
    return null;
  }
}

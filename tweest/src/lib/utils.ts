export function formatToTimeAgo(date: Date | string): string {
  const time =
    typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const now = new Date().getTime();
  const diff = time - now;

  const formatter = new Intl.RelativeTimeFormat("ko");
  const units: [number, "hours" | "minutes" | "seconds" | "days"][] = [
    [60 * 60 * 1000 * 24, "days"],
    [60 * 60 * 1000, "hours"],
    [60 * 1000, "minutes"],
    [1000, "seconds"],
  ];
  const unit = units.find(([x]) => Math.abs(diff) > x);
  if (!unit) {
    return "";
  }
  return formatter.format(Math.round(diff / unit[0]), unit[1]);
}

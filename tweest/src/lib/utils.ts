export function formatToTimeAgo(date: Date): string {
  const time = date.getTime();
  const now = new Date().getTime();
  const diff = time - now;

  const formatter = new Intl.RelativeTimeFormat("ko");
  const units: [number, "hours" | "minutes" | "seconds"][] = [
    [60 * 60 * 1000, "hours"],
    [60 * 1000, "minutes"],
    [1000, "seconds"],
  ];
  const unit = units.find(([x, unit]) => Math.abs(diff) > x);
  if (!unit) {
    return "";
  }
  return formatter.format(Math.round(diff / unit[0]), unit[1]);
}

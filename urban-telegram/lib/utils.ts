export function formatToTimeAgo(date: Date): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = date.getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / (1000 * 60));
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "minutes");
}

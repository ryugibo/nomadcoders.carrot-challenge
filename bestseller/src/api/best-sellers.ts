interface IBestSeller {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: "WEEKLY" | "MONTHLY";
}

interface IBestSellersResponse {
  status: "OK";
  copyright: string;
  num_results: number;
  results: IBestSeller[];
}

export async function getBestSellers(): Promise<IBestSellersResponse> {
  const res = await fetch("https://books-api.nomadcoders.workers.dev/lists");
  return res.json();
}

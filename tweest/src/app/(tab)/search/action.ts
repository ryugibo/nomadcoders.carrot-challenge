import { redirect } from "next/navigation";
import { z } from "zod";

const searchSchema = z.object({
  keyword: z.string().min(1, "검색어가 비어있습니다."),
});
export async function searchKeyword(_: any, formData: FormData) {
  const data = {
    keyword: formData.get("keyword"),
  };
  const result = await searchSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  redirect(`/search?keyword=${result.data.keyword}`);
}

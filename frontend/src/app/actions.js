"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateDataPath(path) {
  revalidatePath(path);
  console.log(`Revalidated ${path}`);
}

export async function revalidateDataTag(tag) {
  revalidateTag(tag);
  console.log(`Revalidated ${tag}`);
}

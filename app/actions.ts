"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

const revalidateSchema = z.object({
  id: z.string().min(1),
})

export async function revalidateItem(formData: FormData) {
  try {
    const { id } = revalidateSchema.parse({
      id: formData.get("id"),
    })

    // Revalidate both the item page and the home page
    revalidatePath(`/items/${id}`)
    revalidatePath("/")

    console.log(`Revalidation triggered for item ${id} and home page.`)
    return { success: true, message: "Revalidation successful!" }
  } catch (error) {
    console.error("Revalidation failed:", error)
    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid input for revalidation." }
    }
    return { success: false, message: "An unexpected error occurred during revalidation." }
  }
}

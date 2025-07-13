"use server";

import { SpanStatusCode, trace } from "@opentelemetry/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const revalidateSchema = z.object({
	id: z.string().min(1),
});

export async function revalidateItem(formData: FormData) {
	const tracer = trace.getTracer("isr-experiment");
	const span = tracer.startSpan("revalidateItem");
	try {
		const { id } = revalidateSchema.parse({
			id: formData.get("id"),
		});

		// Revalidate both the item page and the home page
		revalidatePath(`/items/${id}`);
		revalidatePath("/");

		console.log(`Revalidation triggered for item ${id} and home page.`);
		span.setAttribute("revalidated.id", id);
		span.setAttribute("revalidated.path", `/items/${id}`);
		span.setAttribute("revalidated.path", "/");
		return { success: true, message: "Revalidation successful!" };
	} catch (error) {
		span.setStatus({ code: SpanStatusCode.ERROR });
		span.setAttribute("error.message", "Revalidation failed");
		console.error("Revalidation failed:", error);
		if (error instanceof z.ZodError) {
			return { success: false, message: "Invalid input for revalidation." };
		}
		return {
			success: false,
			message: "An unexpected error occurred during revalidation.",
		};
	} finally {
		span.end();
	}
}

import "server-only";
import items from "./items.json";
import { SpanStatusCode, trace } from "@opentelemetry/api";

export interface Item {
	id: string;
	title: string;
	content: string;
}

const tracer = trace.getTracer("isr-experiment");

// Simulate a delay to mimic real-world data fetching
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getItems(): Promise<Item[]> {
	const span = tracer.startSpan("getItems");
	try {
		await delay(Math.floor(Math.random() * 1800) + 200);
		return items;
	} finally {
		span.end();
	}
}

export async function getItem(id: string): Promise<Item | null> {
	const span = tracer.startSpan("getItem");
	try {
		await delay(Math.floor(Math.random() * 1800) + 200);

		// Artificial error simulation for testing purposes
		if (id === "404") {
			span.setStatus({ code: SpanStatusCode.ERROR });
			span.setAttribute("error.message", "Item not found");
			return null; // Not found
		}
		if (id === "500") {
			span.setStatus({ code: SpanStatusCode.ERROR });
			span.setAttribute("error.message", "Server error");
			throw new Error("A simulated server error occurred.");
		}

		const item = items.find((item) => item.id === id);
		span.setAttribute("item.id", id);
		span.setAttribute("item.title", item?.title || "Not found");
		return item || null;
	} finally {
		span.end();
	}
}

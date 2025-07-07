import "server-only"
import items from "./items.json"

export interface Item {
  id: string
  title: string
  content: string
}

// Simulate a delay to mimic real-world data fetching
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getItems(): Promise<Item[]> {
  await delay(500)
  return items
}

export async function getItem(id: string): Promise<Item | null> {
  await delay(500)

  // Artificial error simulation for testing purposes
  if (id === "404") {
    return null // Not found
  }
  if (id === "500") {
    throw new Error("A simulated server error occurred.")
  }

  const item = items.find((item) => item.id === id)
  return item || null
}

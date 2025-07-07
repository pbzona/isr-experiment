import { getItems } from "@/lib/data"
import Link from "next/link"

// Revalidate this page every 60 seconds
export const revalidate = 60

export default async function HomePage() {
  const items = await getItems()
  const generatedAt = new Date().toLocaleTimeString()

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ISR Content Index</h1>
        <p className="text-muted-foreground">
          This page lists all available content and is regenerated every 60 seconds.
        </p>
        <p className="text-sm text-muted-foreground/80 mt-1">Page generated at: {generatedAt}</p>
      </header>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            href={`/items/${item.id}`}
            key={item.id}
            className="block p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>
          Try navigating to{" "}
          <Link href="/items/404" className="underline hover:text-primary">
            /items/404
          </Link>{" "}
          to test a 404 error.
        </p>
        <p>
          Try navigating to{" "}
          <Link href="/items/500" className="underline hover:text-primary">
            /items/500
          </Link>{" "}
          to test a 5xx error.
        </p>
      </div>
    </div>
  )
}

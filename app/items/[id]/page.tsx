import { getItem, getItems } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import RevalidateInfo from "./revalidate-info";

// Revalidate this page every 60 seconds
export const revalidate = 60;

// Pre-render paths at build time
export async function generateStaticParams() {
	const items = await getItems();
	return items.map((item) => ({
		id: item.id,
	}));
}

export default async function ItemPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const item = await getItem(id);

	if (!item) {
		notFound();
	}

	const generatedAt = new Date();

	return (
		<div className="max-w-3xl mx-auto">
			<Link
				href="/"
				className="text-muted-foreground hover:text-primary mb-6 inline-block"
			>
				&larr; Back to Index
			</Link>

			<article className="space-y-4">
				<h1 className="text-4xl font-bold text-primary">{item.title}</h1>
				<p className="text-lg text-muted-foreground leading-relaxed">
					{item.content}
				</p>
			</article>

			<div className="mt-12 p-4 border border-dashed border-border rounded-lg">
				<RevalidateInfo
					itemId={item.id}
					generatedAt={generatedAt.toISOString()}
					revalidateAfterSeconds={revalidate}
				/>
			</div>
		</div>
	);
}

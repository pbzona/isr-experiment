"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { revalidateItem } from "@/app/actions";

interface RevalidateInfoProps {
	itemId: string;
	generatedAt: string;
	revalidateAfterSeconds: number;
}

async function revalidateItemReducer(
	state: { success: boolean; message: string },
	formData: FormData,
) {
	return await revalidateItem(formData);
}

function RevalidateButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground transition-colors"
		>
			{pending ? "Revalidating..." : "Revalidate Now"}
		</button>
	);
}

export default function RevalidateInfo({
	itemId,
	generatedAt,
	revalidateAfterSeconds,
}: RevalidateInfoProps) {
	const [timeLeft, setTimeLeft] = useState(revalidateAfterSeconds);
	const [formState, formAction] = useActionState(revalidateItemReducer, {
		success: false,
		message: "",
	});
	const [toast, setToast] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : revalidateAfterSeconds));
		}, 1000);
		return () => clearInterval(interval);
	}, [revalidateAfterSeconds]);

	useEffect(() => {
		if (formState.message) {
			setToast(formState);
			const t = setTimeout(() => setToast(null), 3000);
			return () => clearTimeout(t);
		}
	}, [formState]);

	return (
		<div className="space-y-3 text-sm">
			<p>
				<span className="font-semibold">Page Generated:</span>{" "}
				<span className="text-muted-foreground">
					{new Date(generatedAt).toLocaleTimeString()}
				</span>
			</p>
			<p>
				<span className="font-semibold">Next automatic revalidation in:</span>{" "}
				<span className="text-muted-foreground">{timeLeft} seconds</span>
			</p>
			<div className="flex items-center gap-4 pt-2">
				<form action={formAction}>
					<input type="hidden" name="id" value={itemId} />
					<RevalidateButton />
				</form>
				{toast && (
					<p
						className={`text-xs ${toast.success ? "text-green-400" : "text-red-400"}`}
					>
						{toast.message}
					</p>
				)}
			</div>
		</div>
	);
}

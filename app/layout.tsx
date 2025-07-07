import type React from "react";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Next.js ISR Demo",
	description: "A demonstration of Incremental Static Regeneration in Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={cn("antialiased", GeistMono.className)}>
				<main className="container mx-auto px-4 py-8 md:py-12">{children}</main>
			</body>
		</html>
	);
}

export const revalidate = 300;

export default async function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1>Not Found</h1>
		</div>
	);
}

import { registerOTel } from "@vercel/otel";

export function register() {
	registerOTel({
		serviceName: "isr-experiment",
		instrumentationConfig: {
			fetch: {
				propagateContextUrls: [],
			},
		},
	});
}

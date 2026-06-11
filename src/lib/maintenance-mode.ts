import { vercelAdapter } from "@flags-sdk/vercel";

export const MAINTENANCE_MODE_KEY = "maintenance-mode";

const maintenanceModeAdapter = vercelAdapter<boolean, Record<string, never>>();

type AdapterDecisionContext = Parameters<typeof maintenanceModeAdapter.decide>[0];
type FlagEvaluationContext = {
	headers: Headers;
	cookies: unknown;
};

export async function getMaintenanceMode(context: FlagEvaluationContext) {
	try {
		const value = await maintenanceModeAdapter.decide({
			key: MAINTENANCE_MODE_KEY,
			defaultValue: false,
			headers: context.headers,
			cookies: context.cookies as AdapterDecisionContext["cookies"],
		});

		return value === true;
	} catch {
		return false;
	}
}

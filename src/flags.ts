import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";
import { MAINTENANCE_MODE_KEY } from "./lib/maintenance-mode";

export const maintenanceMode = flag<boolean>({
	key: MAINTENANCE_MODE_KEY,
	description: "Locks Dracania Archives to the homepage and displays a maintenance banner.",
	defaultValue: false,
	options: [
		{ label: "Off", value: false },
		{ label: "On", value: true },
	],
	adapter: vercelAdapter(),
});

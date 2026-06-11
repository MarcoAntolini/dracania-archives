import type { Roles } from "./enums/roles";

type Permission = (typeof PERMISSIONS)[Roles][number];

const PERMISSIONS = {
	owner: [
		"admin:create",
		"items:approve",
		"items:review",
		"items:edit",
		"sets:approve",
		"sets:review",
		"sets:edit",
		"bonus-codes:create",
		"bonus-codes:edit",
		"bonus-codes:delete",
		"events:create",
		"events:edit",
		"events:delete",
	],
	admin: [
		"items:approve",
		"items:review",
		"items:edit",
		"sets:approve",
		"sets:review",
		"sets:edit",
		"bonus-codes:create",
		"bonus-codes:edit",
		"bonus-codes:delete",
		"events:create",
		"events:edit",
		"events:delete",
	],
	user: [],
} as const;

function hasPermission(role: Roles, permission: Permission) {
	return (PERMISSIONS[role] as readonly Permission[]).includes(permission);
}

export { hasPermission };

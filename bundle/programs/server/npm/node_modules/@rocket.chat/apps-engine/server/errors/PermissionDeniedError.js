"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionDeniedError = void 0;
class PermissionDeniedError extends Error {
    constructor({ appId, missingPermissions, methodName, reason }) {
        const permissions = missingPermissions
            .map((permission) => `"${JSON.stringify(permission)}"`)
            .join(', ');
        super(`Failed to call the method ${methodName ? `"${methodName}"` : ''} as the app (${appId}) lacks the following permissions:\n`
            + `[${permissions}]. Declare them in your app.json to fix the issue.\n`
            + `reason: ${reason}`);
    }
}
exports.PermissionDeniedError = PermissionDeniedError;

//# sourceMappingURL=PermissionDeniedError.js.map

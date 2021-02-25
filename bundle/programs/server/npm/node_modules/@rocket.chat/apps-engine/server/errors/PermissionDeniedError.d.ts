import { IPermission } from '../../definition/permissions/IPermission';
interface IPermissionDeniedErrorParams {
    appId: string;
    missingPermissions: Array<IPermission>;
    methodName?: string;
    reason?: string;
}
export declare class PermissionDeniedError extends Error {
    constructor({ appId, missingPermissions, methodName, reason }: IPermissionDeniedErrorParams);
}
export {};

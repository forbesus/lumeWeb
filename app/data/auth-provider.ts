import type {AuthProvider} from "@refinedev/core"

import type {
    AuthActionResponse,
    CheckResponse,
    IdentityResponse,
    OnErrorResponse
    // @ts-ignore
} from "@refinedev/core/dist/interfaces/bindings/auth"
import {Sdk} from "@lumeweb/portal-sdk";
import type {AccountInfoResponse} from "@lumeweb/portal-sdk";

export type AuthFormRequest = {
    email: string;
    password: string;
    rememberMe: boolean;
    redirectTo?: string;
}

export type RegisterFormRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type Identity = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class PortalAuthProvider implements RequiredAuthProvider {
    constructor(apiUrl: string) {
        this._sdk = Sdk.create(apiUrl);

        const methods: Array<keyof AuthProvider> = [
            'login',
            'logout',
            'check',
            'onError',
            'register',
            'forgotPassword',
            'updatePassword',
            'getPermissions',
            'getIdentity',
        ];

        methods.forEach((method) => {
            this[method] = this[method]?.bind(this) as any;
        });
    }

    private _sdk: Sdk;

    get sdk(): Sdk {
        return this._sdk;
    }

    public static create(apiUrl: string): AuthProvider {
        return new PortalAuthProvider(apiUrl);
    }

    async login(params: AuthFormRequest): Promise<AuthActionResponse> {
        const ret = await this._sdk.account().login({
            email: params.email,
            password: params.password,
        })

        let redirectTo: string | undefined;

        if (ret) {
            redirectTo = params.redirectTo;
            if (!redirectTo) {
                redirectTo = ret ? "/dashboard" : "/login";
            }
            this._sdk.setAuthToken(this._sdk.account().jwtToken);
        }

        return {
            success: ret,
            redirectTo,
        };
    }

    async logout(params: any): Promise<AuthActionResponse> {
        let ret = await this._sdk.account().logout();
        return {success: ret, redirectTo: "/login"};
    }

    async check(params?: any): Promise<CheckResponse> {
        const ret = await this._sdk.account().ping();

        if(ret){
            this.maybeSetupAuth();
        }

        return {authenticated: ret, redirectTo: ret ? undefined : "/login"};
    }

    async onError(error: any): Promise<OnErrorResponse> {
        return {logout: true};
    }

    async register(params: RegisterFormRequest): Promise<AuthActionResponse> {
        const ret = await this._sdk.account().register({
            email: params.email,
            password: params.password,
            first_name: params.firstName,
            last_name: params.lastName,
        });
        return {success: ret, redirectTo: ret ? "/dashboard" : undefined};
    }

    async forgotPassword(params: any): Promise<AuthActionResponse> {
        return {success: true};
    }

    async updatePassword(params: any): Promise<AuthActionResponse> {
        return {success: true};
    }

    async getPermissions(params?: Record<string, any>): Promise<AuthActionResponse> {
        return {success: true};
    }

    async getIdentity(params?: Identity): Promise<IdentityResponse> {
        this.maybeSetupAuth();
        const ret = await this._sdk.account().info();

        if (!ret) {
            return {identity: null};
        }

        const acct = ret as AccountInfoResponse;

        return {
            id: acct.id,
            firstName: acct.first_name,
            lastName: acct.last_name,
            email: acct.email,
        };
    }

    maybeSetupAuth(): void {
       const jwt = this._sdk.account().jwtToken
        if (jwt) {
            this._sdk.setAuthToken(jwt);
        }
    }
}

export interface RequiredAuthProvider extends AuthProvider {
    login: AuthProvider['login'];
    logout: AuthProvider['logout'];
    check: AuthProvider['check'];
    onError: AuthProvider['onError'];
    register: AuthProvider['register'];
    forgotPassword: AuthProvider['forgotPassword'];
    updatePassword: AuthProvider['updatePassword'];
    getPermissions: AuthProvider['getPermissions'];
    getIdentity: AuthProvider['getIdentity'];
}

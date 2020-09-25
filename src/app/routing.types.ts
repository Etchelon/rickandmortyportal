import { InjectionToken } from "@angular/core";
import { Route } from "@angular/router";

export interface RouteMetadata {
	label: string;
	hidden?: boolean;
	icon?: string;
}

export interface RouteWithMetadata extends Route {
	metadata: RouteMetadata;
}

export interface AppRoute {
	path: string;
	label: string;
	nesting: number;
	icon?: string;
}

export const APP_ROUTES = new InjectionToken<AppRoute[]>("The list of routes defined in the app");

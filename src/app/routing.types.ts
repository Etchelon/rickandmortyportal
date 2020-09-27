import { InjectionToken } from "@angular/core";
import { Route } from "@angular/router";

/**
 * Describes the shape of human readable metadata used to extract the sidenav menu
 * from the routes configured in the application
 */
export interface RouteMetadata {
	/** Name of the route */
	label: string;
	/** Whether to hide this route from the sidenav menu */
	hidden?: boolean;
	/** Icon to show in the sidenav menu to the left of the label */
	icon?: string;
}

export interface RouteWithMetadata extends Route {
	metadata: RouteMetadata;
}

/**
 * Data model for the items actually rendered in the sidenav menu.
 * Contains the route's metadata and also the full path of a route, in order to enable navigation
 */
export interface AppRoute {
	path: string;
	label: string;
	nesting: number;
	icon?: string;
}

export const APP_ROUTES = new InjectionToken<AppRoute[]>("The list of routes defined in the app");

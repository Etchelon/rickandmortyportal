import { InjectionToken, NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export interface AppRoute {
	path: string;
	label: string;
	nesting: number;
	icon?: string;
}

export interface RouteMetadata {
	label: string;
	hidden?: boolean;
	icon?: string;
}

export interface RouteWithMetadata extends Route {
	metadata: RouteMetadata;
}

export const APP_ROUTES = new InjectionToken<AppRoute[]>("The list of routes defined in the app");

export const routes: RouteWithMetadata[] = [
	{
		path: "",
		component: HomeComponent,
		metadata: { label: "Home" },
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "characters",
				metadata: { label: "", hidden: true },
			},
			{
				path: "characters",
				loadChildren: () => import("./characters/characters.module").then(m => m.CharactersModule),
				metadata: { label: "Characters" },
			},
			{
				path: "locations",
				redirectTo: "not-found",
				metadata: { label: "Locations (not implemented)" },
			},
			{
				path: "episodes",
				redirectTo: "not-found",
				metadata: { label: "Episodes (not implemented)" },
			},
		] as RouteWithMetadata[],
	},
	{
		path: "not-found",
		component: NotFoundComponent,
		metadata: {
			label: "404 - Not Found",
			hidden: true,
		},
	},
	{
		path: "**",
		redirectTo: "not-found",
		metadata: {
			label: "Catch all",
			hidden: true,
		},
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

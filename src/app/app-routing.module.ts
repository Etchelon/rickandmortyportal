import { InjectionToken, NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouteWithMetadata } from "./routing.types";

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
		] as RouteWithMetadata[],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

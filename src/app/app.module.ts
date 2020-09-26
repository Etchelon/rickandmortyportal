import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import _ from "lodash";
import { AppRoutingModule, routes as routerRoutes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppRoute, APP_ROUTES, RouteWithMetadata } from "./routing.types";
import { joinPaths } from "./utils/url-management";

function getRouteAndChildren(route: RouteWithMetadata, pathSoFar = "/", nesting = 0): AppRoute[] {
	if (route.metadata.hidden) {
		return [];
	}

	const path = joinPaths(pathSoFar, route.path ?? "");
	return [
		{ label: route.metadata.label, nesting, icon: route.metadata.icon, path },
		..._.chain((route.children as RouteWithMetadata[]) ?? [])
			.filter(r => !r.metadata.hidden)
			.map(r => getRouteAndChildren(r, path, nesting + 1))
			.flattenDeep()
			.value(),
	];
}

export function getAppRoutes(): AppRoute[] {
	return _.chain(routerRoutes)
		.map(r => getRouteAndChildren(r))
		.flattenDeep()
		.value();
}

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,
		AppRoutingModule,
	],
	declarations: [AppComponent, HomeComponent, NotFoundComponent],
	providers: [
		{
			provide: APP_ROUTES,
			useFactory: getAppRoutes,
			deps: [],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

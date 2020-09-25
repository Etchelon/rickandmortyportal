import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import _ from "lodash";
import { AppRoute, AppRoutingModule, APP_ROUTES, routes as routerRoutes, RouteWithMetadata } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const trim = (s: string) => s.trim();
const normalizeEnd = (s: string) => (s.endsWith("/") ? s.substr(0, s.length - 1) : s);
const normalizeStart = (s: string) => (s.startsWith("/") ? s.substr(0, s.length - 1) : s);
const normalize = (s: string) => normalizeEnd(normalizeStart(trim(s)));

const joinPaths = (lhs: string, rhs: string) => {
	return `${normalize(lhs)}/${normalize(rhs)}`;
};

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
	imports: [BrowserModule, BrowserAnimationsModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, AppRoutingModule],
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

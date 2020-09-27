import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { API_BASE_URL } from "./app/api/api.types";
import { AppModule } from "./app/app.module";

// Disable double CD checks in Angular
enableProdMode();

export function getApiBaseUrl(): string {
	const url = document.getElementsByTagName("api-endpoint")[0]?.getAttribute("href");
	if (!url) {
		throw new Error("Error while initializing the Portal. The url to the api must be provided.");
	}

	return url;
}

const extraProviders = [{ provide: API_BASE_URL, useFactory: getApiBaseUrl, deps: [] }];

platformBrowserDynamic(extraProviders)
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));

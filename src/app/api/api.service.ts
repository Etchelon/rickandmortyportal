import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import _ from "lodash";
import { ApiResource, IApiResource } from "./api-resource";
import { API_BASE_URL, Character, GetAllCharactersOptions } from "./api.types";

export interface IApiService {
	character: IApiResource<Character, GetAllCharactersOptions>;
}

export const API_SERVICE = new InjectionToken<IApiService>("The service used to retrieve character data");

@Injectable({ providedIn: "root" })
export class ApiService implements IApiService {
	character: ApiResource<Character, GetAllCharactersOptions>;

	constructor(http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {
		this.character = new ApiResource<Character, GetAllCharactersOptions>(http, baseUrl, "character");
	}
}

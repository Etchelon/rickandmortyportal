import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import _ from "lodash";
import { ApiResource, IApiResource } from "./api-resource";
import {
	API_BASE_URL,
	Character,
	Episode,
	GetAllCharactersOptions,
	GetAllEpisodesOptions,
	GetAllLocationsOptions,
	Location,
} from "./api.types";

export interface IApiService {
	character: IApiResource<Character, GetAllCharactersOptions>;
	location: IApiResource<Location, GetAllLocationsOptions>;
	episode: IApiResource<Episode, GetAllEpisodesOptions>;
}

export const API_SERVICE = new InjectionToken<IApiService>("The service used to retrieve character data");

@Injectable({ providedIn: "root" })
export class ApiService implements IApiService {
	character: ApiResource<Character, GetAllCharactersOptions>;
	location: ApiResource<Location, GetAllLocationsOptions>;
	episode: ApiResource<Episode, GetAllEpisodesOptions>;

	constructor(http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {
		this.character = new ApiResource<Character, GetAllCharactersOptions>(http, baseUrl, "character");
		this.location = new ApiResource<Location, GetAllLocationsOptions>(http, baseUrl, "locations");
		this.episode = new ApiResource<Episode, GetAllEpisodesOptions>(http, baseUrl, "episode");
	}
}

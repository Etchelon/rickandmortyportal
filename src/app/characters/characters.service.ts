import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import _ from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { API_BASE_URL, PaginatedResponse } from "../api/api.types";
import { joinPaths, querify } from "../utils/url-management";
import { Character, GetAllFilters } from "./api-types";

export interface ICharactersService {
	/** Get one or more characters by their ids */
	one(ids: number): Observable<Character>;

	/** Get one or more characters by their ids */
	many(...ids: number[]): Observable<Character[]>;

	/** Get a paginated list of characters */
	all(): Observable<PaginatedResponse<Character>>;
}

export const CHARACTERS_SERVICE = new InjectionToken<ICharactersService>("The service used to retrieve character data");

@Injectable({ providedIn: "root" })
export class CharactersService implements ICharactersService {
	private readonly endpoint: string;

	constructor(private readonly http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {
		this.endpoint = joinPaths(baseUrl, "character");
	}

	one(id: number): Observable<Character> {
		return this.many(id).pipe(
			map(res => {
				const ret = _.first(res);
				if (_.isUndefined(ret)) {
					throw new Error("Not found.");
				}
				return ret;
			})
		);
	}

	many(...ids: number[]): Observable<Character[]> {
		const params = _.join(ids, ",");
		return this.get<Character[]>(params);
	}

	all(filters?: GetAllFilters): Observable<PaginatedResponse<Character>> {
		const params = _.isEmpty(filters) ? "" : querify(filters);
		return this.get<PaginatedResponse<Character>>(params);
	}

	private get<T>(params: string): Observable<T> {
		const url = joinPaths(this.endpoint, params);
		return this.http.get<T>(url);
	}
}
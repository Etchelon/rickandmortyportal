import { HttpClient } from "@angular/common/http";
import _ from "lodash";
import { Observable } from "rxjs";
import { joinPaths, querify } from "../utils/url-management";
import { PaginatedRequestOptions, PaginatedResponse } from "./api.types";

/**
 * Interface describing a resource in the RickAndMorty APIs
 */
export interface IApiResource<T, U extends PaginatedRequestOptions = PaginatedRequestOptions> {
	/** Get one or more Ts by their ids */
	one(ids: number): Observable<T>;

	/** Get one or more Ts by their ids */
	many(...ids: number[]): Observable<T[]>;

	/** Get a paginated list of Ts */
	all(options: U): Observable<PaginatedResponse<T>>;
}

export class ApiResource<T, TOptions extends PaginatedRequestOptions> implements IApiResource<T, TOptions> {
	private readonly endpoint: string;

	constructor(private readonly http: HttpClient, baseUrl: string, resourceName: string) {
		this.endpoint = joinPaths(baseUrl, resourceName);
	}

	one(id: number): Observable<T> {
		const params = String(id);
		return this.get<T>(params);
	}

	many(...ids: number[]): Observable<T[]> {
		const params = _.join(ids, ",");
		return this.get<T[]>(params);
	}

	all(options: TOptions): Observable<PaginatedResponse<T>> {
		const params = _.isEmpty(options) ? "" : querify(options);
		return this.get<PaginatedResponse<T>>(params);
	}

	private get<U>(params: string): Observable<U> {
		const url = joinPaths(this.endpoint, params);
		return this.http.get<U>(url);
	}
}

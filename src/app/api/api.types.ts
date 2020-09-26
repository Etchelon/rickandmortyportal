import { InjectionToken } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>("The base url of the Rick & Morty API");

/**
 * Interface describing the shape of the object containing pagination info when calling the APIs
 */
export interface PaginationInfo {
	/** Number of items in the current response */
	count: number;
	/** Total number of pages available with the current page size (fixed to 20) */
	pages: number;
	/** Link to the next page (null if we have just retrieved the last one) */
	next: string;
	/** Link to the previous page (null if we have just retrieved the first one) */
	prev: string;
}

/**
 * Interface describing the shape of all responses to GET requests to the API
 */
export interface PaginatedResponse<T> {
	/** Info on the pagination status */
	info: PaginationInfo;
	/** The actual list of results */
	results: T[];
}

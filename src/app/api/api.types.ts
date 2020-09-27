import { InjectionToken } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>("The base url of the Rick & Morty API");

export interface PaginatedRequestOptions {
	page?: number;
}

/**
 * Interface describing the shape of the object containing pagination info when calling the APIs
 */
export interface PaginationInfo {
	/** Total number of items matching the request's filters */
	count: number;
	/** Total number of pages available with the current page size (fixed to 20) and filters */
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

export interface ApiEntity {
	/** The id of the entity */
	id: number;
	/** Link to the entity's own endpoint */
	url: string;
	/** Time at which the entity was created in the database */
	created: string;
}

//#region Character

export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";
export interface LocationReference {
	name: string;
	url: string;
}

/**
 * Interface describing the shape of a Character object returned by the APIs
 */
export interface Character extends ApiEntity {
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: CharacterGender;
	origin: LocationReference;
	location: LocationReference;
	image: string;
	episode: string[];
}

/**
 * Interface describing the shape of the filters accepted by the GetAll API
 */
export interface GetAllCharactersOptions extends PaginatedRequestOptions {
	name?: string;
	status?: CharacterStatus;
	species?: string;
	type?: string;
	gender?: CharacterGender;
}

//#endregion

//#region Location

/**
 * Interface describing the shape of a Location object returned by the APIs
 */
export interface Location extends ApiEntity {
	name: string;
	type: string;
	dimension: string;
	residents: string[];
}

/**
 * Interface describing the shape of the filters accepted by the GetAll API
 */
export interface GetAllLocationsOptions extends PaginatedRequestOptions {
	name?: string;
	type?: string;
	dimension?: string;
}

//#endregion

//#region Episode

/**
 * Interface describing the shape of an Episode object returned by the APIs
 */
export interface Episode extends ApiEntity {
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
}

/**
 * Interface describing the shape of the filters accepted by the GetAll API
 */
export interface GetAllEpisodesOptions extends PaginatedRequestOptions {
	name?: string;
	episode?: string;
}

//#endregion

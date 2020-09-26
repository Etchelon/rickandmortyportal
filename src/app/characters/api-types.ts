export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";
export interface LocationReference {
	name: string;
	url: string;
}

/**
 * Interface describing the shape of a Character object returned by the APIs
 */
export interface Character {
	id: number;
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: CharacterGender;
	origin: LocationReference;
	location: LocationReference;
	image: string;
	episode: string[];
	url: string;
	created: string;
}

/**
 * Interface describing the shape of the filters accepted by the GetAll API
 */
export interface GetAllFilters {
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: CharacterGender;
}

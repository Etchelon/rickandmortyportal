import _ from "lodash";
import { pipe } from "./functional";

const trim = (s: string) => s.trim();
const normalizeEnd = (s: string) => (s.endsWith("/") ? s.substr(0, s.length - 1) : s);
const normalizeStart = (s: string) => (s.startsWith("/") ? s.substr(0, s.length - 1) : s);
const normalize = pipe<string>(trim, normalizeStart, normalizeEnd);

export const joinPaths = (lhs: string, rhs: string) => {
	return `${normalize(lhs)}/${normalize(rhs)}`;
};

/**
 * Turns an object into a query string
 * @param item The item to querystringify
 * @param isAddition If true, the query string returned will start with &, otherwise with ?
 */
export function querify(item: any, isAddition = false): string {
	let queryStringBody = "";
	_.forOwn(_.pickBy(item), (value, key) =>
		_.isArray(value) ? _.each(value, val => (queryStringBody += `${key}=${val}&`)) : (queryStringBody += `${key}=${value}&`)
	);
	if (!queryStringBody) {
		return "";
	}
	return (isAddition ? "&" : "?") + queryStringBody.substring(0, queryStringBody.length - 1);
}

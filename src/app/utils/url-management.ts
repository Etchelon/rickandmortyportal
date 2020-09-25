import { pipe } from "./functional";

const trim = (s: string) => s.trim();
const normalizeEnd = (s: string) => (s.endsWith("/") ? s.substr(0, s.length - 1) : s);
const normalizeStart = (s: string) => (s.startsWith("/") ? s.substr(0, s.length - 1) : s);
const normalize = pipe<string>(trim, normalizeStart, normalizeEnd);

export const joinPaths = (lhs: string, rhs: string) => {
	return `${normalize(lhs)}/${normalize(rhs)}`;
};

import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import _ from "lodash";
import { Observable } from "rxjs";
import { API_SERVICE, IApiService } from "../api/api.service";
import { Character } from "../api/api.types";

@Injectable()
export class CharacterResolver implements Resolve<Character> {
	constructor(@Inject(API_SERVICE) private readonly apiService: IApiService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Character> {
		const id = route.paramMap.get("id");
		if (_.isNil(id)) {
			throw new Error("Character id must be provided to load its detail page");
		}

		return this.apiService.character.one(+id);
	}
}

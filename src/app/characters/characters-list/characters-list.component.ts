import { Component, Inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Character } from "../api-types";
import { CHARACTERS_SERVICE, ICharactersService } from "../characters.service";

@Component({
	selector: "characters-list",
	templateUrl: "./characters-list.component.html",
	styleUrls: ["./characters-list.component.scss"],
})
export class CharactersListComponent implements OnInit {
	characters$!: Observable<Character[]>;

	constructor(@Inject(CHARACTERS_SERVICE) private readonly service: ICharactersService) {}

	ngOnInit(): void {
		this.characters$ = this.service.all().pipe(map(page => page.results));
	}
}

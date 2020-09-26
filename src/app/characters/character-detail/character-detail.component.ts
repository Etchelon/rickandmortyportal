import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Character } from "../../api/api.types";

@Component({
	selector: "character-detail",
	templateUrl: "./character-detail.component.html",
	styleUrls: ["./character-detail.component.scss"],
})
export class CharacterDetailComponent implements OnInit {
	character!: Character;

	constructor(private readonly route: ActivatedRoute) {}

	ngOnInit(): void {
		this.character = this.route.snapshot.data.character;
	}
}

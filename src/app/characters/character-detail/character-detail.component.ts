import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import _ from "lodash";
import { API_SERVICE, IApiService } from "src/app/api/api.service";
import { Character, Episode } from "../../api/api.types";

@Component({
	selector: "character-detail",
	templateUrl: "./character-detail.component.html",
	styleUrls: ["./character-detail.component.scss"],
})
export class CharacterDetailComponent implements OnInit {
	character!: Character;
	charactersEpisodes: Episode[] = [];
	hasLoadedEpisodes = false;

	constructor(private readonly route: ActivatedRoute, @Inject(API_SERVICE) private readonly apiService: IApiService) {}

	ngOnInit(): void {
		this.character = this.route.snapshot.data.character;
		this.apiService.episode.manyByUrls(this.character.episode).subscribe(episodes => {
			this.charactersEpisodes = episodes;
			this.hasLoadedEpisodes = true;
		});
	}
}

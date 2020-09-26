import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharactersListComponent } from "./characters-list/characters-list.component";
import { CharactersRoutingModule } from "./characters-routing.module";
import { CharactersService, CHARACTERS_SERVICE } from "./characters.service";

@NgModule({
	imports: [CommonModule, MatButtonModule, MatCardModule, CharactersRoutingModule],
	declarations: [CharactersListComponent, CharacterDetailComponent],
	providers: [{ provide: CHARACTERS_SERVICE, useExisting: CharactersService }],
})
export class CharactersModule {}

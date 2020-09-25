import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharactersListComponent } from "./characters-list/characters-list.component";
import { CharactersRoutingModule } from "./characters-routing.module";


@NgModule({
  declarations: [CharactersListComponent, CharacterDetailComponent],
  imports: [
	CommonModule,
	CharactersRoutingModule
  ]
})
export class CharactersModule { }

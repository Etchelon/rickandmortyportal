import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharactersListComponent } from "./characters-list/characters-list.component";
import { CharactersRoutingModule } from "./characters-routing.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatChipsModule,
		MatCardModule,
		MatPaginatorModule,
		MatProgressBarModule,
		CharactersRoutingModule,
	],
	declarations: [CharactersListComponent, CharacterDetailComponent],
})
export class CharactersModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharacterResolver } from "./character.resolver";
import { CharactersListComponent } from "./characters-list/characters-list.component";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "list",
	},
	{
		path: "list",
		component: CharactersListComponent,
	},
	{
		path: ":id",
		component: CharacterDetailComponent,
		resolve: {
			character: CharacterResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [{ provide: CharacterResolver, useClass: CharacterResolver }],
})
export class CharactersRoutingModule {}

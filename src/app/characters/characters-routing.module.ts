import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
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
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharactersRoutingModule {}

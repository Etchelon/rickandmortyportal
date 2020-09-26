import { AfterViewInit, Component, Inject, OnDestroy } from "@angular/core";
import _ from "lodash";
import { Observable, Subject } from "rxjs";
import { finalize, map, mergeMap, tap } from "rxjs/operators";
import { API_SERVICE, IApiService } from "../../api/api.service";
import { Character, CharacterStatus, PaginatedResponse } from "../../api/api.types";

@Component({
	selector: "characters-list",
	templateUrl: "./characters-list.component.html",
	styleUrls: ["./characters-list.component.scss"],
})
export class CharactersListComponent implements AfterViewInit, OnDestroy {
	isLoading = false;
	totalCharactersCount = 0;
	private _currentPage = 1;
	private _fetchTrigger = new Subject<void>();
	characters$: Observable<Character[]> = this._fetchTrigger.asObservable().pipe(
		tap(() => (this.isLoading = true)),
		mergeMap(() => this.service.all({ page: this._currentPage })),
		tap(page => this.onDataFetched(page)),
		map(page => page.results),
		finalize(() => {
			this.isLoading = false;
		})
	);

	PAGE_SIZE = 20;

	getStatusColor = _.memoize((status: CharacterStatus): string => {
		switch (status) {
			case "Alive":
				return "accent";
			case "Dead":
				return "primary";
			default:
				return "";
		}
	});

	constructor(@Inject(API_SERVICE) private readonly service: IApiService) {}

	ngAfterViewInit(): void {
		this.fetchData();
	}

	ngOnDestroy(): void {
		this._fetchTrigger.complete();
	}

	onPageSelected(page: number): void {
		this._currentPage = page;
		this.fetchData();
	}

	private fetchData(): void {
		this._fetchTrigger.next();
	}

	private onDataFetched(page: PaginatedResponse<Character>): void {
		this.totalCharactersCount = page.info.count;
		this.isLoading = false;
	}
}

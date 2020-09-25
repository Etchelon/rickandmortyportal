import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, HostBinding, Inject, OnDestroy } from "@angular/core";
import { AppRoute, APP_ROUTES } from "../routing.types";

@Component({
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnDestroy {
	@HostBinding("class.mobile")
	get isMobile(): boolean {
		return this.mobileQuery.matches;
	}
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(@Inject(APP_ROUTES) public routes: AppRoute[], changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery = media.matchMedia("(max-width: 600px)");
		this.mobileQuery.addEventListener("change", this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
	}
}

import { Inject } from "@angular/core";
import { Component, Input, OnInit } from "@angular/core";
import { API_SERVICE, IApiService } from "../../../api/api.service";
import { Location, LocationReference } from "../../../api/api.types";

@Component({
	selector: "location-reference",
	templateUrl: "./location-reference.component.html",
	styleUrls: ["./location-reference.component.scss"],
})
export class LocationReferenceComponent implements OnInit {
	@Input() label!: string;
	@Input() reference!: LocationReference;
	location: Location | undefined;
	isLoading = false;

	constructor(@Inject(API_SERVICE) private readonly service: IApiService) {}

	ngOnInit(): void {
		this.fetchLocation();
	}

	private fetchLocation(): void {
		if (!this.reference.url) {
			return;
		}

		this.isLoading = true;
		this.service.location.oneByUrl(this.reference.url).subscribe(location => {
			this.location = location;
			this.isLoading = false;
		});
	}
}

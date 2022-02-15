import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
	selector: 'shop-dashboard-page',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

	token:any=localStorage.getItem("token");

	constructor(private el: ElementRef, private renderer: Renderer2) {
	}

	ngOnInit(): void {
	}

	logOut(){
		localStorage.removeItem('token');
		localStorage.removeItem("userId");
		location.reload();
	   }

	viewTab($event: Event, prevId: number, nextId: number) {
		$event.preventDefault();
		let nodes = this.el.nativeElement.querySelectorAll(".nav-dashboard .nav-link");
		this.renderer.removeClass(nodes[prevId], 'active');
		this.renderer.addClass(nodes[nextId], 'active');
	}
}

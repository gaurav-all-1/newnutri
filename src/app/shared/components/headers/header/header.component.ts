import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
	selector: 'molla-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
	isTrue:boolean=false
	token:any=localStorage.getItem("token");

	@Input() containerClass = "container";

	wishCount = 0;

	constructor(public activeRoute: ActivatedRoute, public utilsService: UtilsService, public modalService: ModalService,private master:MasterService) {
	}

	ngOnInit(): void {
		this.UserLogin();
	}

	UserLogin(){
		if(this.token){
		  this.isTrue=true
		}else{
		  this.isTrue=false
		}
	   }
	   
	   
	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}
}

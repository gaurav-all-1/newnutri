import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/shared/services/master.service'; 

@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
	loginForm:any
	registerForm:any
	error:boolean=false
  message:string=""

	constructor(private masterService:MasterService,private route:Router) { }

	ngOnInit(): void {
		this.loginForm=new FormGroup({
			email:new FormControl("" ,Validators.required),
			password:new FormControl("",Validators.required)
		  })

		  this.registerForm=new FormGroup({
			email:new FormControl("" ,Validators.required),
			password:new FormControl("",Validators.required)
		  })
	}

	onlogin() {
		
			var email=this.loginForm.get("email").value;
			var password=this.loginForm.get("password").value;
			if(email==""||email==undefined){
			  this.error=true;
			  this.message="please enter your email id"
			  
			}else if (password==""|| password==undefined){
			  this.error=true;
			  this.message="please enter your password";
			
			}else{
			  const data={
				"username":email,
				"password":password
			  }
			  this.masterService.methodPost(data,"/login").subscribe((res:any)=>{
				var data=JSON.parse(JSON.stringify(res));
				console.log(data)
				console.log(data.token)
				if(data.token!="" && data.token!=undefined){
				  
				  localStorage.setItem("token", data.token);
				  localStorage.setItem("userId", data.id);
				  
				  this.error=false;
				  this.message="You are login "
				  this.route.navigate([" "])
				  location.reload();
				  
				}else{
				  this.error=false;
				  this.message="something wrong please check your details"
				}
				
			  })
			   
			}
		 
		  
	}

	userRegister(){
		
		var email=this.registerForm.get("email").value;
		var password=this.registerForm.get("password").value;
		console.log(email,password)
		if (email=="" || email==undefined || email==null){
		  this.error=true
		  this.message="please enter the email ID"
		  
		}else if  (password==""|| password==undefined || password==null){
		  this.error=true;
		  this.message="this enter your password"
		 
		}else{
		  const data={
			"email":email,
			"password":password
		  }
		  this.masterService.methodPost(data,"/user/registration").subscribe(res=>{
			var data=JSON.parse(JSON.stringify(res));
			console.log(data)
		   if(data["message"]!=""){
			 this.error=false;
			 this.message="you are Registered Please Login"
			 
		   }else{
			 this.error=true
			 this.message="something wrong please try again"
			 
		   }
	
			
			
		  },(error=>{
			alert("something wrong please check carefully")
		  }))
		 
		  
		}
		
	   
	  }

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
}
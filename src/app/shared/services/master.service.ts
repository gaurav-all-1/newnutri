import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  push(value: any) {
    throw new Error('Method not implemented.');
  }
  userToken=localStorage.getItem('token');
  apURL = 'http://18.219.65.148:8081';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  


  httpOption1 = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'authorization':`Bearer ${this.userToken}`
    })
  }

  header(){
    if(this.userToken){
      return   {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization':`Bearer ${this.userToken}`
        })
      }
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })}
  }

  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }



// api functions==================//

getMethod(dataApi:any){
  console.log(this.apURL+dataApi)
  return this.http.get(this.apURL+dataApi, this.header())
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// kaushal

methodPost(data:any, dataApi:any){
  return this.http.post<any>(this.apURL+dataApi, JSON.stringify(data), this.header())
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// methodPut(data:any, dataApi:any){
//   return this.http.put<any>(this.apURL+dataApi, JSON.stringify(data), this.header())
//   .pipe(
//     retry(1),
//     catchError(this.handleError)
//   )
// } 

methodPostProfile(data:any, dataApi:any){
  return this.http.post<any>(this.apURL+dataApi, data ,this.httpOption1)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

methodPut(data:any,dataApi:any){
  return this.http.put<any>(this.apURL+dataApi, JSON.stringify(data), this.header())
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


deleteMethod( dataApi:any){
  return this.http.delete<any>(this.apURL+dataApi, this.header())
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
} 


}

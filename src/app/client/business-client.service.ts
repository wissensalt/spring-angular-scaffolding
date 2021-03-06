import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ResponseData } from '../model/response-data';
import { retry, catchError } from 'rxjs/operators';
import { Business } from '../model/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessClientService {

  apiUrl = "http://localhost:8080";

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders ({
      'Content-Type' : 'application/json'
    })
  }

  simpanData(businessDTO : Business) : Observable<HttpResponse<ResponseData>> {
    return this.httpClient.post<HttpResponse<ResponseData>> (      
      this.apiUrl+"/insert", 
      JSON.stringify(businessDTO),       
      this.httpOptions,
      ).pipe(
        retry(1),
        catchError(this.handleError)
      ) 
  }

  get() : Observable<Business[]> {
    return this.httpClient.get<Business[]>(
      this.apiUrl
    );
  }

  edit(businessDTO : Business) : Observable<HttpResponse<ResponseData>> {
    return this.httpClient.post<HttpResponse<ResponseData>> (
      this.apiUrl+"/update",
      JSON.stringify(businessDTO),
      this.httpOptions,
      )
      .pipe(
        retry(1),
        catchError(this.handleError)
      )    
  }

  delete(personalName : string) : Observable<HttpResponse<ResponseData>> {
    return this.httpClient.delete<HttpResponse<ResponseData>> (
      this.apiUrl+"/delete?personalName="+personalName,      
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )    
  }

  findByName(personalName : string) : Observable<Business> {
    return this.httpClient.get<Business>(
      this.apiUrl+"/findByPersonalName?personalName="+personalName,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )    
  }

  handleError(error) {
    let errorMessage = `Error Code: ${error.status} - ${error.error.error} \nMessage: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

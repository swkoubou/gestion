import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import {Jsonp,URLSearchParams} from '@angular/http';

@Injectable()
export class RequestService {

  private sinUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/';
  private stepUrl = 'https://api.fitbit.com/1/user/-/activities/steps/date/';
  private backurl = 'http://apihms.swkoubou.com';
  constructor( private http:Http,
              private jsonp:Jsonp) { }

  getHeartbeat(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let sinurl = 'https://api.fitbit.com/1/user/-/devices.json';
//this.sinUrl + day + "/1d/1sec.json";
    return this.http.get(sinurl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getStep(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let hosuUrl = this.stepUrl + day + "/1d.json";
    return this.http.get(hosuUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getWeek(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let weekUrl = this.stepUrl + day + "/7d.json";
    return this.http.get(weekUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getMonth(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let monthUrl = this.stepUrl + day + "/1m.json";
    return this.http.get(monthUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  login(username:string,password:string):Observable<string[]>{
    var params = new URLSearchParams();
    params.set('password',password);

    let options = new RequestOptions({search:params});

    return this.http.post(this.backurl + '/users/' + username + '/login','',options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  update(username:string,height:string,backtoken:string,password:string,weight:string,repass:string,newuser:string):Observable<string[]>{
    console.log('Authorization:Bearer ' + backtoken);
    let creUrl = 'http://localhost:3000/test';
    var params = new URLSearchParams();
    params.set('height',height);
    params.set('weight',weight);
    params.set('username',newuser);
    params.set('old_password',password);
    params.set('new_password',repass);

    let headers = new Headers({"Authorization":"Bearer " + backtoken});

    let options = new RequestOptions({headers:headers,search:params});
    console.log(backtoken);
    return this.http.post('http://apihms.swkoubou.com/users/ak' ,'',options)
            .map(this.extractData)
            .catch(this.handleError);
  }


  //これも定番。
  private extractData(res:Response){
    let body = res.json();
    return body || { };
  }

  //これも定番
  private handleError(error:Response | any){
    let errMsg:string;
    if(error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  testGet() {
    return this.http.get('assets/data/data.json')
      .map(res => res.json())
      .catch(this.handleError);
  }
}

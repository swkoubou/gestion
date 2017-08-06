import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import {Jsonp,URLSearchParams} from '@angular/http';

@Injectable()
export class RequestService {

  private HeartRateUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/';
  private StepsUrl = 'https://api.fitbit.com/1/user/-/activities/steps/date/';
  private backurl = 'http://apihms.swkoubou.com';
  constructor( private http:Http,
              private jsonp:Jsonp) { }

  getWeekHeartRate(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let heartRateUrl = this.HeartRateUrl + day + "/7d.json";
    return this.http.get(heartRateUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getWeekSteps(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let stepsUrl = this.StepsUrl + day + "/7d.json";
    return this.http.get(stepsUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getMonth(token:string,day:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let monthUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json';//this.StepsUrl + day + "/1m.json";
    return this.http.get(monthUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getProfile(token:string):Observable<string[]>{
    let headers = new Headers({'Authorization':"Bearer " + token});
    let options = new RequestOptions({headers:headers});
    let monthUrl = 'https://api.fitbit.com/1/user/-/profile.json'
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

  create_group(Mailadress:string,Password:string,Groupname:string,Firstname:string,Lastname:string,Sex:string):Observable<string[]>{
    let creUrl = 'http://gestion2api.swkoubou.com/groups';
    var params = new URLSearchParams();
    params.set('name', Groupname);
    params.set('email', Mailadress);
    params.set('first_name', Firstname);
    params.set('last_name', Lastname);
    params.set('gender', Sex);
    params.set('password', Password);

    //let options = new RequestOptions({search:params});
    return this.http.post(creUrl ,params,'')
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
}

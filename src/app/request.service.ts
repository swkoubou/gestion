import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RequestService {

  private HeartRateUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/';
  private StepsUrl = 'https://api.fitbit.com/1/user/-/activities/steps/date/';
  private backurl = 'https://gestion2api.swkoubou.com';
  constructor( private http: Http, private jsonp: Jsonp) { }

  //Fitbitから１週間の心拍数を取得
  getWeekHeartRate(token: string, day: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const heartRateUrl = this.HeartRateUrl + day + '/7d.json';
    return this.http.get(heartRateUrl, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //Fitbitから１週間の歩数を取得
  getWeekSteps(token: string, day: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const stepsUrl = this.StepsUrl + day + '/7d.json';
    return this.http.get(stepsUrl, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //サーバーから勤務時間を取得
  getMonth(token: string, day: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users/me/attendance_records';
    return this.http.get(monthUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }
  //サーバーから勤務時間を取得
    backProfile(token: string): Observable<string[]> {
      const headers = new Headers({'Authorization': 'Bearer ' + token});
      const options = new RequestOptions({headers: headers});
      const monthUrl = this.backurl + '/users/me';
      return this.http.get(monthUrl,options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

  //Fitbitからプロフィールを取得
  getProfile(token: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = 'https://api.fitbit.com/1/user/-/profile.json'
    return this.http.get(monthUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //FitbitのID、アクセストークンをサーバーに格納
  putProfile(token: string, fitbitid: string, fitbittoken: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const params = new URLSearchParams();
    params.set('fitbit_id', fitbitid);
    params.set('fitbit_access_token', fitbittoken);
    const monthUrl = this.backurl + '/users/me';
    return this.http.put(monthUrl,params, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //管理者からユーザーデータを変更
  AdminChange(token: string, password: string, email: string, id: number): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const params = new URLSearchParams();
    params.set('email', email);
    params.set('password', password);
    const monthUrl = this.backurl + '/users/' + id;
    return this.http.put(monthUrl, params, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //自分のストレス値を取得
  GetStress(token: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users/me/stress';
    return this.http.get(monthUrl, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //ログイン
  login(mailadress: string, password: string, groupname: string): Observable<string[]> {
    const creUrl = this.backurl + '/authorize/signin';
    const params = new URLSearchParams();
    params.set('group_name', groupname);
    params.set('email', mailadress);
    params.set('password', password);

    // const options = new RequestOptions({search:params});
    return this.http.post(creUrl , params, '')
            .map(this.extractData)
            .catch(this.handleError);
  }
// tslint:disable-next-line:max-line-length
// グループを作成
  create_group(Mailadress: string, Password: string, Groupname: string, Firstname: string, Lastname: string, Sex: string):Observable<string[]> {
    const creUrl = this.backurl + '/groups';
    const params = new URLSearchParams();
    params.set('name', Groupname);
    params.set('email', Mailadress);
    params.set('first_name', Firstname);
    params.set('last_name', Lastname);
    params.set('gender', Sex);
    params.set('password', Password);

    return this.http.post(creUrl ,params, '')
            .map(this.extractData)
            .catch(this.handleError);
  }

  //グループ名が存在してるか調べられる
  group_search(Groupname: string): Observable<string[]> {
    const creUrl = this.backurl + '/groups/' + Groupname;

    return this.http.get(creUrl)
            .map(this.extractData)
            .catch(this.handleError);
  }

  //出勤
  enter(token: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users/me/work/enter';
    return this.http.post(monthUrl, '', options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //退勤
  logout(token: string): Observable<string[]>{
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users/me/work/exit';
    return this.http.post(monthUrl, '', options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //指定したユーザのストレスを取得
  getstress(token: string, id: number): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users/' + id + '/stress';
    return this.http.get(monthUrl, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //指定したユーザの勤務時間を取得
  getworktime(token: string, id: number): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users/' + id + '/attendance_records';
    return this.http.get(monthUrl, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //自分の名前を変更
  ChangeUserName(token: string, firstname: string, lastname:string): Observable<string[]>{
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const params = new URLSearchParams();
    params.set('first_name', firstname);
    params.set('last_name', lastname);
    const monthUrl = this.backurl + '/users/me';
    return this.http.put(monthUrl,params, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  //　管理者からユーザーを新規で作成
// tslint:disable-next-line:max-line-length
  create_user(Mailadress: string, Password: string, Firstname: string, Lastname: string, Gender: string, token: string): Observable<string[]>{
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const creUrl = this.backurl + '/users';
    const params = new URLSearchParams();
    params.set('email', Mailadress);
    params.set('first_name', Firstname);
    params.set('last_name', Lastname);
    params.set('gender', Gender);
    params.set('password', Password);

    return this.http.post(creUrl ,params, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  //ユーザーリストを取得
  getuserlist(token: string): Observable<string[]> {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({headers: headers});
    const monthUrl = this.backurl + '/users';
    return this.http.get(monthUrl, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }


  // これも定番。
  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  // これも定番
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

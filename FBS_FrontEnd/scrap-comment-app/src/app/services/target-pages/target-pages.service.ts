import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TargetPagesService {
  private readonly _targetUrl: string =
    'http://localhost:3000/api/target-pages';

  constructor(private http: HttpClient) {}

  getTargetPages() {
    const target = this.http.get(this._targetUrl + '/list-target');
    return target;
  }

  insertTargetPage(
    target_date_in: Date,
    target_link: string,
    target_desc: string
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const bodyTarget = JSON.stringify({
      target_date_in,
      target_link,
      target_desc
    });

    this.http
      .post(this._targetUrl + '/insert-target', bodyTarget, httpOptions)
      .subscribe(res => {
        return res;
      });
  }

  deleteTargetPage(_id: string) {
    const bodyTarget = JSON.stringify({
      _id
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: bodyTarget
    };

    this.http
      .delete(this._targetUrl + '/delete-target', httpOptions)
      .subscribe(res => {
        return res;
      });
  }
}

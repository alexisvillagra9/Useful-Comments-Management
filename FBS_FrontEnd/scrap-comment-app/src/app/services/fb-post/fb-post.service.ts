import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comentarios } from 'src/app/models/Comentarios/comments';

@Injectable({
  providedIn: 'root'
})
export class FbPostService {
  private readonly _fbPostUrl: string = 'http://localhost:3000/api/fb-post';

  constructor(private http: HttpClient) {}

  updatePostReport(_id: string, msg_report: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const bodyReport = JSON.stringify({
      report_msg: msg_report
    });

    this.http
      .put(this._fbPostUrl + '/update-post/' + _id, bodyReport, httpOptions)
      .subscribe(res => {
        return res;
      });
  }

  updatePostReply(_id: string, id_reply: string, msg_report: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const bodyReport = JSON.stringify({
      report_msg: msg_report,
      id_reply
    });

    // console.log(_id, bodyReport);

    this.http
      .put(this._fbPostUrl + '/update-reply/' + _id, bodyReport, httpOptions)
      .subscribe(res => {
        return res;
      });
  }

  updatePotableReply(_id: string, id_reply: string, potable: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const bodyPotable = JSON.stringify({
      potable,
      id_reply
    });

    // console.log(_id, bodyPotable);

    return this.http
      .put(
        this._fbPostUrl + '/update-reply-potable/' + _id,
        bodyPotable,
        httpOptions
      );
  }

  updatePotablePost(_id: string, id_reply: string, potable: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const bodyReport = JSON.stringify({
      potable
    });

    return this.http
      .put(
        this._fbPostUrl + '/update-post-potable/' + _id,
        bodyReport,
        httpOptions
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentarios } from 'src/app/models/Comentarios/comments';
import { Cantidades } from 'src/app/models/Comentarios/quantities';
import { of, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsListService {
  private readonly _commentUrl: string = 'http://localhost:3000/api/comments';
  tot = 0;

  constructor(private http: HttpClient) {}

  getComments() {
    const comments = this.http.get(this._commentUrl + '/list-all');
    return comments;
  }

  getCommentsPost() {
    const commentsPost = this.http.get(this._commentUrl + '/list-all-post');
    return commentsPost;
  }

  getCommentsPotables() {
    const comments = this.http.get(this._commentUrl + '/list-all-potables');
    return comments;
  }

  getCommentsPotablesPost() {
    const commentsPost = this.http.get(
      this._commentUrl + '/list-all-potables-post'
    );
    return commentsPost;
  }

  getCommentsCount(): Observable<Cantidades> {
    const cantidades = new Cantidades();
    cantidades.total = 0;
    cantidades.potCount = 0;

    return Observable.create((observer: Observer<Cantidades>) => {
      this.http.get(this._commentUrl + '/list-all').subscribe(
        (resp: Comentarios[]) => {
          cantidades.total += resp.length;
          cantidades.replyCount = resp.length;

          this.http.get(this._commentUrl + '/list-all-post').subscribe(
            (resp: Comentarios[]) => {
              cantidades.total += resp.length;
              cantidades.postCount = resp.length;

              this.http.get(this._commentUrl + '/list-all-potables').subscribe(
                (resp: Comentarios[]) => {
                  cantidades.potCount += resp.length;

                  this.http
                    .get(this._commentUrl + '/list-all-potables-post')
                    .subscribe(
                      (resp: Comentarios[]) => {
                        cantidades.potCount += resp.length;

                        observer.next(cantidades);
                      },
                      error => {
                        observer.error(error);
                      }
                    );
                },
                error => {
                  observer.error(error);
                }
              );
            },
            error => {
              observer.error(error);
            }
          );
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}

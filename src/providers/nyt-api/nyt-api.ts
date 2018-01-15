import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {NewsModel} from '../..//models/news-model'

/*
  Generated class for the NytApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NytApiProvider {

  private apiUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=44c89c2b1b494a16806d0561bc58cdd4';


  constructor(public http: Http) {}

  getTopStories(page): Observable<NewsModel[]> {
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg = `${error.status} - ${error.statusText || ''}`;
   console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Gothram, GothramHolder } from "../model/gothram";

import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class GothramService {

  constructor(private http: Http, private notificationsService: NotificationsService) { }

  getAll(): Observable<GothramHolder> {
    return this.http.get("api/gothram")
         .map((res: Response) => {
           this.notificationsService.success("Gothrams List Received");
           return this.convertData(res.json());
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getAllByName(name): Observable<GothramHolder> {
    return this.http.get("api/gothram/search/nameStartsWith?name=" + name)
         .map((res: Response) => {
           this.notificationsService.success("Gothrams List by Name Received");
           return this.convertData(res.json());
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  save(gothram: Gothram): Observable<Gothram> {
    return this.http.post("api/gothram/", gothram)
         .map((res: Response) => {
           this.notificationsService.success("Gothram Saved Successfully");
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  delete(id: number): Observable<Response> {
    this.notificationsService.success("Gothram Removed Successfully");
    return this.http.delete("api/gothram/" + id);
  }

  private convertData(embedded: any): GothramHolder {
    let gothramHolder = new GothramHolder();
    gothramHolder.gothrams = embedded["_embedded"]["data"];
    return gothramHolder;
  }

}

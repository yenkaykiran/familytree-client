import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Member, MemberHolder } from "../model/member";
import { MemberData } from "../model/member-data";
import { Gothram } from "../model/gothram";

import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class MemberService {

  constructor(private http: Http, private notificationsService: NotificationsService) { }

  getAll(page): Observable<MemberHolder> {
    return this.http.get("api/member?page=" + page + "&sort=dateOfBirth,desc")
         .map((res: Response) => {
           this.notificationsService.success("Members List Received");
           return this.convertData(res.json());
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  syncSpouse(): Observable<void> {
    return this.http.get("api/sync-spouse")
         .map((res: Response) => {
           this.notificationsService.success("Members Spouse Synced");
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getAllByName(name): Observable<MemberHolder> {
    return this.http.get("api/member?name=" + name + "&sort=dateOfBirth,desc")
         .map((res: Response) => {
           this.notificationsService.success("Members List by Name " + name + "Received");
           return this.convertData(res.json());
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  save(member: Member): Observable<Member> {
    return this.http.post("api/member/", member)
         .map((res: Response) => {
           this.notificationsService.success("Member Saved Sucessfully");
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  makeRoot(member: Member): Observable<Member> {
    return this.http.post("api/member/root", member)
         .map((res: Response) => {
           this.notificationsService.success("Member Made Root Sucessfully");
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  delete(id: number): Observable<Response> {
    this.notificationsService.success("Member Removed Successfully");
    return this.http.delete("api/member/" + id);
  }

  fetchRelated(relation: string, member: Member): Observable<Member[]> {
    return this.http.get("api/member/" + member.id + "/" + relation + "?sort=dateOfBirth,desc")
         .map((res: Response) => {
           this.notificationsService.success("Related Members List Received");
           return res.json();
         });
  }

  linkMembers(source: number, destination: number, relation: string): Observable<Response> {
    return this.http.post("api/link?source=" + source + "&destination=" + destination + "&relation=" + relation, {})
         .map((res: Response) => {
           this.notificationsService.success("Member Successfully Linked");
           return res;
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  unlinkMembers(source: number, destination: number, relation: string): Observable<Response> {
    return this.http.post("api/unlink?source=" + source + "&destination=" + destination + "&relation=" + relation, {})
         .map((res: Response) => {
           this.notificationsService.success("Member Successfully UnLinked");
           return res;
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  export(): Observable<MemberData[]> {
    return this.http.get("api/export")
         .map((res: Response) => {
           this.notificationsService.success("Members Data Successfully Exported");
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  miniExport(member: number): Observable<MemberData[]> {
    return this.http.get("api/export?member=" + member)
         .map((res: Response) => {
           this.notificationsService.success("Members Data Successfully Exported");
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  importData(memberData: MemberData[]): Observable<Response> {
    return this.http.post("api/import", memberData)
         .map((res: Response) => {
           this.notificationsService.success("Members Data Successfully Imported");
           return res;
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  attachGothram(member: Member, gothram: Gothram): Observable<Member> {
    return this.http.post("api/attach-gothram?member=" + member.id + "&gothram=" + gothram.id, {})
         .map((res: Response) => {
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  private convertData(embedded: any): MemberHolder {
    let membersHolder = new MemberHolder();
    membersHolder.members = embedded["content"];
    // if(embedded.page) {
      membersHolder.size = embedded.size;
      membersHolder.totalElements = embedded.totalElements;
      membersHolder.totalPages = embedded.totalPages;
      membersHolder.number = embedded.number;
    // }
    return membersHolder;
  }

}

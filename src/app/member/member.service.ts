import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Member, MemberData, MemberHolder } from "../model/member";

import { Gothram } from "../model/gothram";

@Injectable()
export class MemberService {

  constructor(private http: Http) { }

  getAll(page): Observable<MemberHolder> {
    return this.http.get("api/member?page=" + page)
         .map((res: Response) => {
           return this.convertData(res.json());
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getAllByName(name): Observable<MemberHolder> {
    return this.http.get("api/member/search/nameStartsWith?name=" + name)
         .map((res: Response) => {
           return this.convertData(res.json());
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  save(member: Member): Observable<Member> {
    return this.http.post("api/member/", member)
         .map((res: Response) => {
           return res.json();
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  delete(id: number): Observable<Response> {
    return this.http.delete("api/member/" + id);
  }

  fetchRelated(relation: string, member: Member): Observable<MemberHolder> {
    return this.http.get("api/member/" + member.id + "/" + relation)
         .map((res: Response) => {
           return this.convertData(res.json());
         });
  }

  linkMembers(source: number, destination: number, relation: string): Observable<Response> {
    return this.http.post("api/link?source=" + source + "&destination=" + destination + "&relation=" + relation, {})
         .map((res: Response) => {
           return res;
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  unlinkMembers(source: number, destination: number, relation: string): Observable<Response> {
    return this.http.post("api/unlink?source=" + source + "&destination=" + destination + "&relation=" + relation, {})
         .map((res: Response) => {
           return res;
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  export(): Observable<Response> {
    return this.http.get("api/export")
         .map((res: Response) => {
           return res;
         })
         .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  importData(memberData: MemberData[]): Observable<Response> {
    return this.http.post("api/import", memberData)
         .map((res: Response) => {
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
    membersHolder.members = embedded["_embedded"]["data"];
    if(embedded.page) {
      membersHolder.size = embedded.page.size;
      membersHolder.totalElements = embedded.page.totalElements;
      membersHolder.totalPages = embedded.page.totalPages;
      membersHolder.number = embedded.page.number;
    }
    return membersHolder;
  }

}

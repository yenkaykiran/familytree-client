import { Gender } from './gender.enum';
import { Gothram } from './gothram';

export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export class MemberHolder extends Page {
  members: Member[];
}

export class Member {
  id: number;
  familyName: string;
  alternateFamilyName: string;
  initials: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;
  place: string;
  contact: string;
  gothram: Gothram;
  gothramId: number;
  son: Member[];
  daughter: Member[];
  spouse: Member[];
  father: Member;
  mother: Member;
}

import { Gender } from './gender.enum';

export class MemberData {
  id: number;
  familyName: string;
  alternateFamilyName: string;
  initials: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;
  place: string;
  contact: string;
  gothram: string;
  gothramId: number;
  son: number[];
  daughter: number[];
  spouse: number[];
  father: number;
  mother: number;
}

import {AgeInfo} from './AgeInfo';

export class ZodiacResponse {
  ageInfo: AgeInfo;
  specialMessages: Array<string>;

  constructor(init: Partial<ZodiacResponse>) {
    Object.assign(this, init);
  }
}

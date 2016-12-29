

export class Finding {

  id: number;
  code: string;

  obj?: string;
  objId?: number;
  objName?: string;

  path?: string;
  index?: number;
  key?: string;
  date: number = Date.now();
  fixable: boolean = false;

  message?: string;
  detail?: string;
  data?: Object;

}
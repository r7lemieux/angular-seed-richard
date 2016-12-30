import {PhoneType} from './phoneType';
import {Title} from "./title";

export class Person {

  public id: string;

  public displayName: string;

  public title: Title;

  public name: {
    familyName: string;
    givenName: string;
    middleName: string;
  }

  public email: string;

  public photo: string;

  public mailingAddress: {
    street1: string,
    street2: string,
    city: string,
    stateProvince: string,
    postalCode: string,
    country: string,
  }

  public phoneNumbers: [{
    type: PhoneType,
    number: number[];
  }]

}

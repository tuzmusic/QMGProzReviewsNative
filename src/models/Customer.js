// @flow
import type Review from "./Review";
import Sugar from "sugar";

export default class Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  reviews: Review[];

  constructor(obj: Object) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.address = obj.address;
    this.reviews = obj.reviews;
    this.phone = obj.phone;
    this.email = obj.email;
  }
  get fullName(): string {
    return [this.firstName, this.lastName].join(" ");
  }
  get averageRating(): number {
    const ratings = this.reviews.map(r => r.rating);
    return Sugar.Array.average(ratings);
  }

  static fromApi(json: Object) {
    // TO-DO: Convert API properties to constructor properties
    return new Customer(json);
  }

  static toApi(customer: Customer): CustomerApiPayload {
    // TO-DO: Convert constructor properties to API properties
    return { ...customer };
  }
}

type CustomerApiPayload = { [key: string]: any }; // TBD!

/* type CustomerObject = {
  id: number,
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  email: string,
  reviews: Review[]
}; */

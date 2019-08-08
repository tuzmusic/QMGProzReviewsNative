// @flow
import Review from "./Review";
import type {
  CustomerCollection,
  CustomerApiPostPayload
} from "../redux/CustomerTypes";
import Sugar from "sugar";

export default class Customer {
  id: number;
  name: string;
  address: string;
  description: string;
  reviews: Review[];
  avatarUrl: string; // almost definitely won't be showing a picture

  owner: Object; // should be User

  // firstName: string;
  // lastName: string;
  // phone: string;
  // email: string;

  constructor(obj: Object) {
    if (!obj) return;
    this.id = obj.id;
    this.address = obj.address;
    this.reviews = obj.reviews;

    // this.firstName = obj.firstName;
    // this.lastName = obj.lastName;
    // this.phone = obj.phone;
    // this.email = obj.email;
  }
  // get fullName(): string {
  //   return [this.firstName, this.lastName].join(" ");
  // }
  get averageRating(): number {
    const ratings = this.reviews.map(r => r.rating);
    return Sugar.Array.average(ratings);
  }

  static fromApi(obj: Object): Customer {
    // NOTE: In electro I make these conversions in the API. Whatever.
    const customer = new Customer();

    customer.id = obj.id;
    customer.name = obj.title;
    customer.description = obj.description;
    customer.address = obj.address;
    customer.owner = obj.owner; // should be transformed to user, TO DO
    customer.avatarUrl = obj.galleryImage.url;
    customer.reviews = obj.reviews || []; // should be handled correctly, not an empty array placeholder TO DO

    return customer;
  }

  // This function may be completely unnecessary (if we're just creating a customer from a form)
  // But we might need it for an update?
  static toApi(customer: CustomerApiPostPayload): CustomerApiPostPayload {
    // TO-DO: Convert constructor properties to API properties
    return { ...customer };
  }

  static CollectionFromArray(customers: Customer[]): CustomerCollection {
    const obj = {};
    customers.forEach(c => (obj[c.id] = c));
    return obj;
  }
}

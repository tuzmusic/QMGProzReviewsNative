// @flow
import type User from "./User";
import Sugar from "sugar";

export type ReviewObject = {
  id: number,
  user: User,
  customerId: number,
  content: string,
  rating: number,
  date?: string | { raw: string }
};

export default class Review {
  id: number;
  user: User;
  customerId: number;
  content: string;
  rating: number;
  date: Sugar.Date;

  constructor(obj: ReviewObject) {
    this.id = obj.id;
    this.user = obj.user;
    this.customerId = obj.customerId;
    this.content = obj.content;
    this.rating = obj.rating;

    this.date = !obj.date
      ? new Sugar.Date()
      : obj.date.raw // should only happen if obj has already been created as a Review (I think?)
      ? new Sugar.Date(obj.date.raw)
      : new Sugar.Date(obj.date);
  }

  get timePast(): string {
    // console.log("inside timePast. date:", this.date);

    return this.date.relative().raw;
  }

  static fromApi(json: Object): Review {
    // TO-DO: Convert API properties to constructor properties
    return new Review(json);
  }
}

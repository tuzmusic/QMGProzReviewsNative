// @flow
import User from "./User";
import Sugar from "sugar";
import { dateFrom } from "../utility/functions";

export default class Review {
  id: number;
  author: User;
  customerId: number;
  content: string;
  rating: number;
  date: Sugar.Date;

  constructor(obj: Object) {
    if (!obj) return;
    this.id = obj.id;
    this.author = obj.user;
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

  static fromApi(obj: ReviewGetApiObject): Review {
    // TO-DO: Convert API properties to constructor properties
    const review = new Review();

    review.id = Number(obj.id);
    review.content = obj.content;
    review.customerId = Number(obj.customer_id);
    review.rating = Number(obj.rating);
    review.author = User.fromCustomApi(obj.author);
    review.date = dateFrom(obj.date);
    return review;
  }
}

type ReviewGetApiObject = {
  id: string,
  customer_id: string,
  content: string,
  date: string,
  rating: string,
  rating_info: {
    review_stars: string[],
    review_average: string[],
    rate: string[]
  },
  author: User
};

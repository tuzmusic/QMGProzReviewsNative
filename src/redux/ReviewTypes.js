import Review from "../models/Review";

export type ReviewFormObject = {
  customerId: number,
  content: string,
  userId: number,
  rating: number
};

export type ReviewPostRequestObject = {
  post_id: number,
  content: string,
  user_id: number,
  rating: number
};

export type ReviewPostResponseObject = {
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

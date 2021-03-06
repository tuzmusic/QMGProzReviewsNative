// @flow
import axios from "axios";
import type { CustomerApiPostPayload } from "../CustomerTypes";
import type {
  ReviewPostResponseObject,
  ReviewPostRequestObject
} from "../ReviewTypes";
import { ApiUrls } from "../../constants/apiConstants";

// #region Custom API

export async function createCustomerApi(
  customer: CustomerApiPostPayload
): Object {
  const res = await axios.post(ApiUrls.customers, customer);
  return res.data;
}

export async function getCustomersApi(): Object {
  try {
    const res = await axios.get(ApiUrls.customers);
    return res.data;
  } catch (error) {
    const err = error;
    console.log(err);
  }
}

export async function createReviewApi(
  review: ReviewPostRequestObject
): ReviewPostResponseObject {
  const res = await axios.post(ApiUrls.reviews, review);
  return res.data;
}

// #endregion

// #region JSON API

async function getNonce(type) {
  let params;
  switch (type) {
    case nonces.createPost:
      params = { controller: "posts", method: "create_post" };
    case nonces.updatePost:
      params = { controller: "posts", method: "update_post" };
  }
  const res = await axios.get(ApiUrls.getNonce, params);
  return res.nonce;
}

const nonces = {
  createPost: "create_post",
  updatePost: "update_post"
};

const Constants = {
  postType: "job_listing",
  postStatus: "publish"
};
// #endregion

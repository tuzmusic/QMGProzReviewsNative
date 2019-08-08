// @flow
import axios from "axios";
import type { CustomerApiPostPayload } from "../CustomerTypes";
import { ApiUrls } from "../../constants/apiConstants";

// #region Custom API

export async function createCustomerApi(
  customer: CustomerApiPostPayload
): Object {
  const res = await axios.post(ApiUrls.customer, customer);
  return res.data;
}

export async function getCustomersApi(): Object {
  try {
    const res = await axios.get(ApiUrls.customer);
    return res.data;
  } catch (error) {
    const err = error;
    console.log(err);
    debugger;
  }
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

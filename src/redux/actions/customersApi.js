// @flow
import axios from "axios";
import { ApiUrls } from "../../constants/apiConstants";

export type CustomerApiPostPayload = {
  name: string,
  description: string,
  address: string,
  location?: { longitude: number, latitude: number }
};

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
async function _createCustomerApi({ name, description, address }) {
  // uses JSON API, but I can't figure out how to add the _job_location meta field
  const nonce = await getNonce(nonces.createPost);
  const params = {
    title: name,
    content: description,
    type: Constants.postType,
    _job_location: address, // <<-- this doesn't work. also doesn't work without the leading underscore. uh oh. (note that _job_location is part of the meta field)
    status: Constants.postStatus,
    nonce
  };
  const res = await axios.post(ApiUrls.createPost, params);
  return res;
}

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

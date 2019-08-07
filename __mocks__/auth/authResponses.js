import User from "../../src/models/User";
export const loginResponse = {
  logout: "User was logged out.",
  apiResponse: {
    status: "ok",
    cookie:
      "testuser1|1560779545|rpqX0H4wlBHdQ1ww6Raon3VqRFRJBEBJjB9WC3Y631t|8a12ba20e3c71c13f1d5bac2b7eced8a13bdb999c1e364ef0f9565a6c3ca5932",
    cookie_name: "wordpress_logged_in_de35f4716c74f1f80e223057c4a2042e",
    user: {
      id: 6,
      username: "testuser1",
      nicename: "testuser1",
      email: "testuser@prozreviews.com",
      url: "",
      registered: "2019-05-28 20:11:49",
      displayname: "testuser1",
      firstname: "Arthur",
      lastname: "Dent",
      nickname: "testuser1",
      description: "",
      capabilities: {
        subscriber: true
      },
      avatar: null
    }
  },
  success: {
    status: "ok",
    cookie:
      "testuser1|1560779545|rpqX0H4wlBHdQ1ww6Raon3VqRFRJBEBJjB9WC3Y631t|8a12ba20e3c71c13f1d5bac2b7eced8a13bdb999c1e364ef0f9565a6c3ca5932",
    cookie_name: "wordpress_logged_in_de35f4716c74f1f80e223057c4a2042e",
    // this mock ideally should be a User where every property is explicitly set; not leaving to the fromApi implementation to be correct. or, whatever or something.
    // user: User.fromApi({
    //   id: 6,
    //   username: "testuser1",
    //   nicename: "testuser1",
    //   email: "testuser@prozreviews.com",
    //   url: "",
    //   registered: "2019-05-28 20:11:49",
    //   displayname: "testuser1",
    //   firstname: "Arthur",
    //   lastname: "Dent",
    //   nickname: "testuser1",
    //   description: "",
    //   capabilities: {
    //     subscriber: true
    //   },
    //   avatar: null
    // }),
    user: new User({
      id: 6,
      username: "testuser1",
      email: "testuser@prozreviews.com",
      firstName: "Arthur",
      lastName: "Dent",
      dateCreated: "2019-05-28 20:11:49"
    })
  },
  failure: {
    status: "error",
    error: "Invalid username/email and/or password."
  }
};

export const registerResponse = {
  nonce: {
    status: "ok",
    controller: "user",
    method: "register",
    nonce: "29a63be176"
  },
  success: {
    status: "ok",
    cookie:
      "apitestuser1|1560382602|w8L8JuhcMIAk8h5bwRmhOjVmPnNjbgNZJmBd7bcFUsL|542260b66fa2080175d9315f2a5bf3486dd174c7483913c46a2658a8d75637c1",
    user_id: 9
  },
  usernameTaken: {
    status: "error",
    error: "Username already exists."
  },
  emailTaken: {
    status: "error",
    error: "E-mail address is already in use."
  },
  usernameError: Error("Username already exists.")
};

export const creds = {
  success: {
    username: "testuser1",
    password: "123123"
  },
  emailSuccess: {
    email: "testuser@prozreviews.com",
    password: "123123"
  },
  badUser: {
    username: "xxx",
    password: "123123"
  },
  badPw: {
    username: "testuser1",
    password: "1231230"
  }
};

const mainParams = {
  nonce: "29a63be176",
  username: "testuser1",
  email: "api1@prozreviews.com",
  display_name: "testuser1",
  user_pass: "123123"
};
const mainCreds = {
  username: "testuser1",
  email: "api1@prozreviews.com",
  password: "123123"
};

export const registration = {
  apiParams: {
    username: mainCreds.username,
    email: mainCreds.email,
    nonce: "29a63be176",
    display_name: mainCreds.username,
    user_pass: mainCreds.password
  },
  badUserApiParams: {
    username: mainCreds.username + "dupe",
    email: mainCreds.email,
    nonce: "29a63be176",
    display_name: mainCreds.username + "dupe",
    user_pass: mainCreds.password
  },
  badEmailApiParams: {
    username: mainCreds.username,
    email: mainCreds.email + "dupe",
    nonce: "29a63be176",
    display_name: mainCreds.username,
    user_pass: mainCreds.password
  },
  userInfo: {
    username: mainParams.username,
    email: mainParams.email,
    password: mainParams.user_pass
  },
  badUserInfo: {
    username: mainCreds.username + "dupe",
    email: mainParams.email,
    password: mainParams.user_pass
  },
  badEmail: {
    username: mainCreds.username,
    email: mainParams.email + "dupe",
    password: mainParams.user_pass
  },
  badUserInfo: {
    username: mainCreds.username + "dupe",
    email: mainParams.email,
    password: mainParams.user_pass
  },
  unhandledInfo: {
    username: mainCreds.username + "dupee",
    email: mainParams.email,
    password: mainParams.user_pass
  },
  completeUser: {
    username: mainParams.username,
    email: mainParams.email,
    userId: registerResponse.success.user_id,
    cookie: registerResponse.success.cookie
  }
};

export const actions = {
  login: {
    success: {
      start: { type: "LOGIN_START", creds: creds.success },
      resolve: { type: "LOGIN_SUCCESS", user: loginResponse.success }
    },
    emailSuccess: {
      start: { type: "LOGIN_START", creds: creds.emailSuccess },
      resolve: { type: "LOGIN_SUCCESS", user: loginResponse.success }
    },
    failure: {
      start: { type: "LOGIN_START", creds: creds.badUser },
      resolve: {
        type: "LOGIN_FAILURE",
        error: "Invalid username/email and/or password."
      }
    }
  },
  registration: {
    success: {
      start: { type: "REGISTRATION_START", info: registration.userInfo },
      resolve: {
        type: "REGISTRATION_SUCCESS",
        user: registration.completeUser
      }
    },
    badUser: {
      start: { type: "REGISTRATION_START", info: registration.badUserInfo },
      resolve: {
        type: "REGISTRATION_FAILURE",
        error: registerResponse.usernameTaken.error
      }
    },
    badEmail: {
      start: { type: "REGISTRATION_START", info: registration.badEmail },
      resolve: {
        type: "REGISTRATION_FAILURE",
        error: registerResponse.emailTaken.error
      }
    },
    unhandledError: {
      start: { type: "REGISTRATION_START", info: registration.unhandledInfo },
      resolve: {
        type: "REGISTRATION_FAILURE",
        error: "Request failed with status code 404"
      }
    }
  },
  logout: {
    start: { type: "LOGOUT_START" },
    success: { type: "LOGOUT_SUCCESS" },
    failure: {
      type: "LOGOUT_FAILURE",
      error: "Network Error"
    }
  }
};

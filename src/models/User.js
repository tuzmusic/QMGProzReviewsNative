// @flow
import Sugar from "sugar";
import { dateFrom } from "../utility/functions";
export default class User {
  id: number;
  firstName: string;
  lastName: string;
  dateCreated: Sugar.Date;
  username: string;
  email: string;
  url: ?string;
  description: ?string;
  avatarUrl: ?string;

  constructor(obj: Object) {
    if (!obj) return;
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.username = obj.username;
    this.dateCreated = dateFrom(!obj.dateCreated);
  }

  get fullName(): string {
    if (!this.firstName && !this.lastName) return "";
    return [this.firstName, this.lastName].join(" ");
  }

  static fromJsonApi(json: Object) {
    const userObject = {
      ...json,
      dateCreated: json.registered,
      firstName: json.firstname,
      lastName: json.lastname
    };
    // TO-DO: Convert API properties to constructor properties
    return new User(userObject);
  }

  static fromCustomApi(obj: Object): User {
    const user = new User();
    user.id = obj.id;
    user.username = obj.username;
    user.email = obj.email;
    user.url = obj.url;
    user.dateCreated = dateFrom(obj.registered);
    user.firstName = obj.firstName;
    user.lastName = obj.lastName;
    user.description = obj.description;
    // user.capabilities = obj.capabilities;
    user.avatarUrl = obj.avatar;

    return user;
  }
}

import Customer from "../src/models/Customer";
import Review from "../src/models/Review";

export default customers = {
  1: new Customer({
    id: 1,
    firstName: "John",
    lastName: "Smith",
    address: "55-57 59th St",
    phone: "545-985-8727",
    email: "listing@example.com",
    reviews: [
      {
        id: 1,
        user: {
          firstName: "Cole",
          lastName: "Harris"
        },
        content: "John smith paid me on time and was a pleasure to work with",
        date: new Date("June 1, 2013"),
        rating: 5
      },
      {
        id: 2,
        user: {
          firstName: "Jonathan"
        },
        content: "John Smith is great!",
        date: new Date("June 1, 2019"),
        rating: 5
      }
    ].map(r => new Review(r))
  }),
  2: new Customer({
    id: 2,
    firstName: "Albert",
    lastName: "Dore",
    address: "123 Main St",
    phone: "098-765-5432",
    email: "albert@example.com",
    reviews: [
      {
        id: 3,
        user: {
          firstName: "Josh",
          lastName: "Purses"
        },
        content: "Albert is the worst!",
        date: new Date("June 1, 2013"),
        rating: 1
      },
      {
        id: 4,
        user: {
          firstName: "Jonathan"
        },
        content: "I hate this guy.",
        date: new Date("June 1, 2019"),
        rating: 3
      }
    ].map(r => new Review(r))
  }),
  3: new Customer({
    id: 3,
    firstName: "Jane",
    lastName: "Smith",
    address: "55-57 59th St",
    phone: "545-985-8727",
    email: "listing@example.com",
    reviews: [
      {
        id: 5,
        user: {
          firstName: "Cole",
          lastName: "Harris"
        },
        content:
          "Jane smith's husband paid me on time and was a pleasure to work with",
        date: new Date("June 1, 2013"),
        rating: 5
      }
    ].map(r => new Review(r))
  })
};

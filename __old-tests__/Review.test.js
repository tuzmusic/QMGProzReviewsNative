import Review from "../src/models/Review";
import Sugar from "sugar";

describe("Review", () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const rev = new Review({ date });

  it("has a timePast property", () => {
    expect(rev.timePast).toEqual("1 day ago");
  });
});

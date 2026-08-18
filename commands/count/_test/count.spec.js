import { DataFixture } from "../../../test";
import { CountTest as T } from "./builder";

describe("Feature: Counting data", () => {
  test("Example: User want to print the counts of people and animals", () => {
    // prettier-ignore
    const data = new DataFixture()
            .withCountry('France')
                .withPeople('John')
                    .withAnimal('Jerry')
                    .withAnimal('Bobby')
            .withCountry('Cambodia')
            .build();

    T.givenFollowingData(data);
    T.whenCounting();
    T.thenTheResultShouldBe([
      {
        name: "France [1]",
        people: [
          { name: "John [2]", animals: [{ name: "Jerry" }, { name: "Bobby" }] },
        ],
      },
      {
        name: "Cambodia [0]",
        people: [],
      },
    ]);
  });
});

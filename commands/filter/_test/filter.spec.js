import { DataFixture } from "../../../test";
import { FilterTest as T } from "./builder";

describe("Feature: Filtering data", () => {
  test("Example: User want to filter data which includes some specific letters", () => {
    // prettier-ignore
    const data = new DataFixture()
            .withCountry('France')
                .withPeople('John')
                    .withAnimal('Jerry')
                    .withAnimal('Bobby')
                .withPeople('Paul')
                    .withAnimal('Harry')
            .withCountry('Cambodia')
               .withPeople('Daniel')
                    .withAnimal('Murfus')
                    .withAnimal('Scar')
            .build();

    T.givenFollowingData(data);
    T.whenFilteringWithPattern("rr");
    T.thenTheResultShouldBe([
      {
        name: "France",
        people: [
          { name: "John", animals: [{ name: "Jerry" }] },
          { name: "Paul", animals: [{ name: "Harry" }] },
        ],
      },
    ]);
  });

  test("Example: User should not see empty arrays", () => {
    // prettier-ignore
    const data = new DataFixture()
            .withCountry('France')
                .withPeople('Paul')
                    .withAnimal('Harry')
            .withCountry('Poland')
            .withCountry('Cambodia')
                .withPeople('Daniel')
                        .withAnimal('Murfus')
                        .withAnimal('Scar')
                .withPeople('John')
            .build();

    T.givenFollowingData(data);
    T.whenFilteringWithPattern("ca");
    T.thenTheResultShouldBe([
      {
        name: "Cambodia",
        people: [{ name: "Daniel", animals: [{ name: "Scar" }] }],
      },
    ]);
  });
});

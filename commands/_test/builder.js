import { filter } from "../filter";

export class FilterTest {
  constructor() {
    this._data;
    this._result;
  }

  static givenFollowingData(data) {
    this._data = data;
  }

  static whenFilteringWithPattern(pattern) {
    this._result = filter(this._data, pattern);
  }

  static thenTheResultShouldBe(_expect) {
    expect(_expect).toEqual(this._result);
  }
}

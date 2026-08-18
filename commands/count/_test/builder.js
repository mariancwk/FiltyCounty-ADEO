import { count } from "../count";

export class CountTest {
  constructor() {
    this._data;
    this._result;
  }

  static givenFollowingData(data) {
    this._data = data;
  }

  static whenCounting() {
    this._result = count(this._data);
  }

  static thenTheResultShouldBe(_expect) {
    expect(_expect).toEqual(this._result);
  }
}

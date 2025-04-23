import pick from "../../../utils/pick";

describe("pick", () => {
  test("should pick specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  test("should return an empty object if no keys match", () => {
    const obj = { x: 42 };
    const result = pick(obj, ["a", "b"]);
    expect(result).toEqual({});
  });
});

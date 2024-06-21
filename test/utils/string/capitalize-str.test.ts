import { capitalizeStr } from "../../../src/utils/string/capitalize-str"

describe("Utils: capitalizeStr", () => {
  it("should capitalize first letter of a string", () => {
    expect(capitalizeStr("hello")).toBe("Hello")
  })

  it("should return empty string if input is empty", () => {
    expect(capitalizeStr("")).toBe("")
  })

  it("should return the same string if first letter is already capitalized", () => {
    expect(capitalizeStr("Hello")).toBe("Hello")
  })
})

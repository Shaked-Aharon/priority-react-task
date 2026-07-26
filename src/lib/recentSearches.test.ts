import { describe, expect, it } from "vitest";
import { addRecentSearch, areSameSearchTerm, cleanSearchTerm } from "./recentSearches";

describe("recent search helpers", () => {
  it("trims search terms", () => {
    expect(cleanSearchTerm("  ambient house  ")).toBe("ambient house");
  });

  it("compares terms case-insensitively", () => {
    expect(areSameSearchTerm("Jazz", " jazz ")).toBe(true);
  });

  it("ignores empty or whitespace-only input", () => {
    expect(addRecentSearch(["jazz"], "   ")).toEqual(["jazz"]);
  });

  it("adds the newest term to the top", () => {
    expect(addRecentSearch(["jazz"], "house")).toEqual(["house", "jazz"]);
  });

  it("moves duplicate terms to the top without duplicating them", () => {
    expect(addRecentSearch(["jazz", "house", "techno"], " HOUSE ")).toEqual([
      "HOUSE",
      "jazz",
      "techno"
    ]);
  });

  it("keeps only the latest five terms", () => {
    const searches = ["one", "two", "three", "four", "five"];

    expect(addRecentSearch(searches, "six")).toEqual(["six", "one", "two", "three", "four"]);
  });
});

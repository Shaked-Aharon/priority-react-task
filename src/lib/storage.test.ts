import { describe, expect, it } from "vitest";
import { loadJson, saveJson } from "./storage";

function createStorage(initialValue: string | null = null) {
  let storedValue = initialValue;

  return {
    getItem: () => storedValue,
    setItem: (_key: string, value: string) => {
      storedValue = value;
    },
    read: () => storedValue
  };
}

describe("storage helpers", () => {
  it("loads JSON from storage", () => {
    const storage = createStorage(JSON.stringify(["jazz"]));

    expect(loadJson("recent", [], storage)).toEqual(["jazz"]);
  });

  it("returns fallback for invalid JSON", () => {
    const storage = createStorage("{not-json");

    expect(loadJson("recent", ["fallback"], storage)).toEqual(["fallback"]);
  });

  it("returns fallback when getItem throws", () => {
    const storage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => undefined
    };

    expect(loadJson("recent", ["fallback"], storage)).toEqual(["fallback"]);
  });

  it("saves JSON and reports success", () => {
    const storage = createStorage();

    expect(saveJson("recent", ["jazz"], storage)).toBe(true);
    expect(storage.read()).toBe(JSON.stringify(["jazz"]));
  });

  it("reports false when setItem throws", () => {
    const storage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("blocked");
      }
    };

    expect(saveJson("recent", ["jazz"], storage)).toBe(false);
  });
});

import { useCallback, useState } from "react";
import { loadJson, saveJson } from "../lib/storage";

export function usePersistentPreference<TValue extends string>(
  key: string,
  fallback: TValue,
  allowedValues: readonly TValue[]
) {
  const [value, setValue] = useState<TValue>(() => {
    const storedValue = loadJson<TValue>(key, fallback);
    return allowedValues.includes(storedValue) ? storedValue : fallback;
  });

  const updateValue = useCallback(
    (nextValue: TValue) => {
      if (!allowedValues.includes(nextValue)) {
        return;
      }

      setValue(nextValue);
      saveJson(key, nextValue);
    },
    [allowedValues, key]
  );

  return [value, updateValue] as const;
}

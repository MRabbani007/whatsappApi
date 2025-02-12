import { useEffect, useState } from "react";

const getLocalValue = (key: string, initValue: any) => {
  //SSR Next.js
  if (typeof window === "undefined") return initValue;

  // if a value is already store
  const localValue = localStorage.getItem(key);
  if (!!localValue) return JSON.parse(localValue);

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

export default function useLocalStorage<T>(key: string, initValue: any) {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  const handleValue = (value: T) => {
    setValue(value);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, handleValue];
}

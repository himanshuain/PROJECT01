import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as R from "ramda";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterDataByUniqueIds = (name: string) => R.uniqBy(R.path([name, "id"]));

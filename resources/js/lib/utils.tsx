import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SortOrder } from "antd/es/table/interface";
import { OrderBy } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformOrderDirectionFromAntToRequest(order?: SortOrder) {
  switch (order) {
    case "descend":
      return "desc";
    case "ascend":
      return "asc";
    default:
      return null;
  }
}

export function transformOrderDirectionFromRequestToAnt(
  order?: OrderBy["order"],
): SortOrder {
  switch (order) {
    case "desc":
      return "descend";
    case "asc":
      return "ascend";
    default:
      return null;
  }
}

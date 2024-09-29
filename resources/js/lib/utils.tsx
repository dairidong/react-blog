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

export function isEmpty<T>(value: T | null | undefined): boolean {
  if (value === null || value === undefined) return true;

  const isObjectOrArray = (obj: any): obj is object | any[] => {
    return typeof obj === "object" && obj !== null;
  };

  if (!isObjectOrArray(value)) return false;

  return Object.keys(value).length === 0;
}

// 辅助函数：截断字符串并添加省略号 generate by tongyi
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return `${str.substring(0, maxLength - 3)}...`;
}

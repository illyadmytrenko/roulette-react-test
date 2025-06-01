import type { ColorType } from "../types/colortype";

export function getBgClass(color: ColorType) {
  switch (color) {
    case "black":
    case "black-Joker":
      return "bg-gray-800";
    case "red":
    case "red-Joker":
      return "bg-red-800";
    case "green":
      return "bg-green-800";
    default:
      return "";
  }
}

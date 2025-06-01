import type { ColorType } from "../types/colortype";

export function getIcon(color: ColorType, className: string) {
  switch (color) {
    case "black-Joker":
      return (
        <img
          src="./white-joker.svg"
          alt="white-joker"
          className={`${className}`}
        />
      );
    case "red-Joker":
      return (
        <img
          src="./black-joker.svg"
          alt="black-joker"
          className={`${className}`}
        />
      );
    case "black":
      return <img src="./white.svg" alt="red" className={`${className}`} />;
    case "red":
      return <img src="./black.svg" alt="black" className={`${className}`} />;
    case "green":
      return <img src="./white.svg" alt="white" className={`${className}`} />;
    default:
      return null;
  }
}

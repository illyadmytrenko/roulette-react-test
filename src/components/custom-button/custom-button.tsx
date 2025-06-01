import type { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  color: "red" | "green" | "gray" | "purple";
  handleClick?: () => void;
  disabled?: boolean;
}

export function CustomButton({
  children,
  color,
  handleClick,
  disabled,
}: CustomButtonProps) {
  const buttonColors = {
    red: "bg-red-400 hover:bg-red-500",
    green: "bg-green-400 hover:bg-green-500",
    gray: "bg-gray-600 hover:bg-gray-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  const buttonPays = {
    red: "Pays 2X",
    green: "Pays 14X",
    gray: "Pays 2X",
    purple: "Pays 7X",
  };

  return (
    <button
      className={`${buttonColors[color]} px-4 py-3 rounded inset-shadow-2xs cursor-pointer transition-colors w-full text-white font-bold uppercase flex justify-between gap-3 disabled:opacity-50`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      <span>{buttonPays[color]}</span>
    </button>
  );
}

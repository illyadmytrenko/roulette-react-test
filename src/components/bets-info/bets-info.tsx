import { CustomButton } from "../custom-button/custom-button";
import { useInterval } from "../../app/modal/use-interval";
import { useState } from "react";
import {
  disabledButtonIntervalTime,
  intervalTime,
} from "../../shared/constants/interval-time";

interface BetsInfoProps {
  buttonColor: "red" | "green" | "gray" | "purple";
  buttonText: string;
}

export function BetsInfo({ buttonColor, buttonText }: BetsInfoProps) {
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleBet = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useInterval(() => setCount(0), intervalTime);

  useInterval(() => {
    setIsDisabled(true);

    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, disabledButtonIntervalTime);

    return () => clearTimeout(timeout);
  }, intervalTime);
  return (
    <div className="w-full">
      <CustomButton
        color={buttonColor}
        handleClick={() => handleBet()}
        disabled={isDisabled}
      >
        {buttonText}
      </CustomButton>
      <p className="text-white opacity-80 my-3 pl-2">{count} Bets total</p>
      <div className="max-h-[200px] overflow-y-auto scrollbar-black">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 text-white opacity-80  py-2 pl-10 pr-3 bg-neutral-800 hover:bg-neutral-700 transition-colors first:rounded-t-md last:rounded-b-md"
          >
            <p className="flex items-center gap-2">
              <img src="./user.svg" alt="user icon" />
              User
            </p>
            <p className="flex items-center gap-2">
              <img src="./chip.png" alt="chip icon" />
              100
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

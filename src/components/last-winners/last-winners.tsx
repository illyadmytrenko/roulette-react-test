import { useHistoryContext } from "../../context/history-context";
import { getBgClass } from "../../shared/functions/get-bg-color";
import { getIcon } from "../../shared/functions/get-icon";
import type { ColorType } from "../../shared/types/colortype";

export function LastWinners() {
  const { history } = useHistoryContext();

  const MAX_HISTORY = 100;

  const order: ColorType[] = [
    "red",
    "black",
    "green",
    "red-Joker",
    "black-Joker",
  ];

  const recentHistory = [...history].slice(-MAX_HISTORY);

  const counts: Record<ColorType, number> = {
    red: 0,
    black: 0,
    green: 0,
    "red-Joker": 0,
    "black-Joker": 0,
  };

  for (const color of recentHistory) {
    if (color in counts) {
      counts[color as keyof typeof counts]++;
    }
  }

  return (
    <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
      <div className="flex justify-center gap-2 flex-wrap sm:flex-nowrap">
        {[...history]
          .slice(-10)
          .reverse()
          .map((color, index) => (
            <div
              key={index}
              className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-md flex items-center justify-center ${getBgClass(
                color
              )}`}
            >
              {getIcon(
                color,
                "!w-[25px] h-[25px] md:!w-[35px] md:h-[35px] lg:!w-[45px] lg:h-[45px]"
              )}
            </div>
          ))}
      </div>

      <div className="flex gap-5 items-center flex-col sm:flex-row">
        <span className="uppercase font-bold text-gray-600">
          Last {recentHistory.length}
        </span>
        <div className="flex gap-4 items-center justify-center flex-wrap sm:flex-nowrap">
          {order.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <div
                className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-md flex items-center justify-center ${getBgClass(
                  color
                )}`}
              >
                {getIcon(
                  color,
                  "!w-[25px] h-[25px] md:!w-[35px] md:h-[35px] lg:!w-[45px] lg:h-[45px]"
                )}
              </div>
              <span className="text-white font-semibold text-lg">
                {counts[color]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

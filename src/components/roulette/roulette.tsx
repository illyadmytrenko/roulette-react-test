import { useState, useEffect, useRef } from "react";
import { Alert } from "antd";
import { useInterval } from "../../app/modal/use-interval";
import { useHistoryContext } from "../../context/history-context";
import type { ColorType } from "../../shared/types/colortype";
import { getIcon } from "../../shared/functions/get-icon";
import { getBgClass } from "../../shared/functions/get-bg-color";
import { intervalTime } from "../../shared/constants/interval-time";

const order: ColorType[] = [
  "red",
  "black",
  "red",
  "black",
  "red",
  "black-Joker",
  "green",
  "red-Joker",
  "black",
  "red",
  "black",
  "red",
  "black",
];

export function Roulette() {
  const { setHistory } = useHistoryContext();

  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isStopping, setIsStopping] = useState(false);
  const [position, setPosition] = useState(0);
  const [progressBarPercent, setProgressBarPercent] = useState(100);
  const [showAlert, setShowAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("slide-down");

  const startTimeRef = useRef(Date.now());

  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(13);

  const MAX_VISIBLE_ITEMS = 13;

  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newItemWidth = Math.max(60, Math.floor(containerWidth / 13));
        const newVisibleItems = Math.floor(containerWidth / newItemWidth);
        setItemWidth(newItemWidth);
        setVisibleItems(newVisibleItems);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const spin = () => {
    if (spinning || itemWidth === 0 || visibleItems === 0) return;

    const FULL_SPINS = 2;
    setSpinning(true);
    setSelectedIndex(null);
    setIsStopping(false);

    const winner = Math.floor(Math.random() * order.length);
    const totalItems =
      MAX_VISIBLE_ITEMS * FULL_SPINS + winner - Math.floor(visibleItems / 2);
    const targetPosition = totalItems * itemWidth;
    console.log(targetPosition);

    setPosition(0);
    setTimeout(() => {
      setPosition(targetPosition);
      setIsStopping(true);
    }, 50);

    setTimeout(() => {
      setSpinning(false);
      setSelectedIndex(winner);
    }, 4300);
  };

  useInterval(() => {
    startTimeRef.current = Date.now();
    setProgressBarPercent(100);
    spin();
  }, intervalTime);

  useInterval(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const percent = 100 - (elapsed / intervalTime) * 100;
    setProgressBarPercent(Math.max(percent, 0));
  }, 10);

  useEffect(() => {
    if (selectedIndex !== null) {
      setShowAlert(true);
      setAlertClass("slide-down");

      setHistory((prevHistory) => [...prevHistory, order[selectedIndex]]);

      const hideTimeout = setTimeout(() => setAlertClass("slide-up"), 4000);
      const removeTimeout = setTimeout(() => setShowAlert(false), 4500);

      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [selectedIndex, setHistory]);

  return (
    <div className="flex flex-col items-center w-full max-w-screen-xl px-2">
      <div
        ref={containerRef}
        className="relative overflow-hidden p-3 bg-black rounded-lg w-full"
      >
        <div
          className="flex gap-2"
          style={{
            width: `${order.length * itemWidth * 5}px`,
            transform: `translateX(-${position}px)`,
            transition: isStopping
              ? "transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
          }}
        >
          {[...order, ...order, ...order, ...order, ...order].map(
            (color, index) => (
              <div
                key={index}
                className={`w-[${itemWidth}px] h-[${itemWidth}px] rounded-md flex items-center justify-center ${getBgClass(
                  color
                )}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              >
                {getIcon(color, `w-[70%] h-[70%]`)}
              </div>
            )
          )}
        </div>
        <div className="absolute top-0 h-5 left-1/2 w-[5px] bg-yellow-400 -translate-x-1/2"></div>
        <div
          className="absolute bottom-0 h-1 left-0 bg-orange-400"
          style={{ width: `${progressBarPercent}%` }}
        ></div>
      </div>

      {showAlert && selectedIndex !== null && (
        <div className="text-lg font-semibold absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={alertClass}>
            <Alert
              message={`${order[selectedIndex]
                .replace(/-/g, " ")
                .replace(/^./, (m) => m.toUpperCase())} won!`}
              type="success"
              showIcon
            />
          </div>
        </div>
      )}
    </div>
  );
}

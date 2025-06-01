import "./app.css";
import { BetsInfo } from "../components/bets-info/bets-info";
import { Roulette } from "../components/roulette/roulette";
import { LastWinners } from "../components/last-winners/last-winners";

function App() {
  return (
    <div className="bg-gray-900 h-screen px-5 md:px-10 lg:px-20 flex flex-col gap-20 justify-center overflow-hidden">
      <LastWinners />
      <Roulette />
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
        <BetsInfo buttonColor="red" buttonText="Bet on Red" />
        <BetsInfo buttonColor="green" buttonText="Bet on Green" />
        <BetsInfo buttonColor="gray" buttonText="Bet on Black" />
        <BetsInfo buttonColor="purple" buttonText="Bet on Joker" />
      </div>
    </div>
  );
}

export default App;

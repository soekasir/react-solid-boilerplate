import { createProvider } from "../../utils/IoC";
import { CounterButton } from "./Component";
import { CounterStore } from "./CounterStore";

const CounterProvider = createProvider([
  { constructor: CounterStore, type: "transient" },
]);

const CounterModule = () => {
  return (
    <CounterProvider>
      <CounterButton />
      <CounterButton />
    </CounterProvider>
  );
};

export default CounterModule;

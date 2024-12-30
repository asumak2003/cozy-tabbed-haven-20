import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const TemperatureControl = () => {
  const [temperature, setTemperature] = useState(22);

  const increaseTemp = () => {
    if (temperature < 30) {
      setTemperature(prev => prev + 1);
    }
  };

  const decreaseTemp = () => {
    if (temperature > 16) {
      setTemperature(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="text-4xl font-bold text-primary">{temperature}°C</div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseTemp}
          className="h-12 w-12 rounded-full border-2 border-primary hover:bg-primary/20"
        >
          <Minus className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={increaseTemp}
          className="h-12 w-12 rounded-full border-2 border-primary hover:bg-primary/20"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
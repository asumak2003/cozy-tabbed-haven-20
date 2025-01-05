import { useState } from "react";
import { Slider } from "./ui/slider";
import { Sun } from "lucide-react";
import { Switch } from "./ui/switch";

export const LightingControl = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState([50]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Sun className={`w-8 h-8 ${isOn ? 'text-primary' : 'text-muted-foreground'}`} />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Off</span>
        <Switch
          checked={isOn}
          onCheckedChange={setIsOn}
        />
        <span className="text-sm text-muted-foreground">On</span>
      </div>
      {isOn && (
        <>
          <div className="text-xl font-semibold text-primary mb-2">
            {brightness[0]}%
          </div>
          <div className="w-full max-w-xs px-4">
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
};
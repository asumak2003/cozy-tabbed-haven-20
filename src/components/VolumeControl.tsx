import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Volume2 } from "lucide-react";

export const VolumeControl = () => {
  const [volume, setVolume] = useState([50]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Voice Volume</h3>
        <span className="text-sm text-gray-400">{volume}%</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Volume2 className="w-6 h-6 text-primary" />
        <Slider
          defaultValue={volume}
          max={100}
          step={1}
          className="w-full"
          onValueChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
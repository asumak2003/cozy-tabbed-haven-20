import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Volume2, Tv, Music } from "lucide-react";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

export const VolumeControl = () => {
  const [tvVolume, setTvVolume] = useState([50]);
  const [musicVolume, setMusicVolume] = useState([50]);
  const [isTvOn, setIsTvOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  return (
    <div className="space-y-8">
      {/* TV Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className={`w-6 h-6 ${isTvOn ? 'text-primary' : 'text-muted-foreground'}`} />
            <h3 className="text-lg font-medium text-white">TV</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Off</span>
            <Switch
              checked={isTvOn}
              onCheckedChange={setIsTvOn}
            />
            <span className="text-sm text-muted-foreground">On</span>
          </div>
        </div>
        
        {isTvOn && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Volume</span>
              <span className="text-sm text-gray-400">{tvVolume}%</span>
            </div>
            <Slider
              value={tvVolume}
              onValueChange={setTvVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Music Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className={`w-6 h-6 ${isMusicOn ? 'text-primary' : 'text-muted-foreground'}`} />
            <h3 className="text-lg font-medium text-white">Music</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Off</span>
            <Switch
              checked={isMusicOn}
              onCheckedChange={setIsMusicOn}
            />
            <span className="text-sm text-muted-foreground">On</span>
          </div>
        </div>
        
        {isMusicOn && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Volume</span>
              <span className="text-sm text-gray-400">{musicVolume}%</span>
            </div>
            <Slider
              value={musicVolume}
              onValueChange={setMusicVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};
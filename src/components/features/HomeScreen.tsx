import { Video } from "lucide-react";
import { RoomGrid } from "./RoomGrid";
import { EnergyButton } from "./EnergyButton";
import { Button } from "../ui/button";
import { useState } from "react";
import { VideoSurveillance } from "./VideoSurveillance";

interface HomeScreenProps {
  rooms: string[];
  onRoomSelect: (room: string) => void;
  onRoomDelete: (room: string) => void;
}

export const HomeScreen = ({ rooms, onRoomSelect, onRoomDelete }: HomeScreenProps) => {
  const [showVideoSurveillance, setShowVideoSurveillance] = useState(false);

  if (showVideoSurveillance) {
    return <VideoSurveillance onBack={() => setShowVideoSurveillance(false)} />;
  }

  return (
    <div className="space-y-6">
      <RoomGrid
        rooms={rooms}
        onRoomSelect={onRoomSelect}
        onRoomDelete={onRoomDelete}
      />
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Button 
          onClick={() => setShowVideoSurveillance(true)}
          className="w-full bg-card hover:bg-card/80 transition-all duration-300 rounded-lg p-4 flex items-center justify-center gap-3 border border-primary/20 shadow-lg hover:shadow-primary/20"
        >
          <Video className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold text-white">Video Surveillance</span>
        </Button>
        <EnergyButton onClick={() => {}} />
      </div>
    </div>
  );
};
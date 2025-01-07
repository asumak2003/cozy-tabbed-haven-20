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
  onEnergyManagement: () => void;
}

export const HomeScreen = ({ 
  rooms, 
  onRoomSelect, 
  onRoomDelete,
  onEnergyManagement 
}: HomeScreenProps) => {
  const [showVideoSurveillance, setShowVideoSurveillance] = useState(false);

  if (showVideoSurveillance) {
    return (
      <div className="w-full">
        <VideoSurveillance onBack={() => setShowVideoSurveillance(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RoomGrid
        rooms={rooms}
        onRoomSelect={onRoomSelect}
        onRoomDelete={onRoomDelete}
      />
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <EnergyButton onClick={onEnergyManagement} />
      </div>
    </div>
  );
};
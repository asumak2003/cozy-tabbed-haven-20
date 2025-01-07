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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Rooms</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowVideoSurveillance(true)}>
            <Video className="mr-2 h-4 w-4" />
            Video Surveillance
          </Button>
        </div>
      </div>
      <RoomGrid
        rooms={rooms}
        onRoomSelect={onRoomSelect}
        onRoomDelete={onRoomDelete}
      />
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <EnergyButton onClick={() => {}} />
      </div>
    </div>
  );
};
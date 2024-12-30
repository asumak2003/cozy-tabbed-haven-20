import { useState } from "react";
import { RoomCard } from "./RoomCard";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom"];
const features = ["Climate", "Lighting", "Entertainment", "Energy", "Voice"];

export const SmartHomeDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
  };

  const handleBack = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        SMART HOME DASHBOARD
      </h1>

      {selectedRoom ? (
        <>
          <Button
            variant="ghost"
            className="mb-6 text-primary hover:text-primary/90"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rooms
          </Button>
          <h2 className="text-2xl font-semibold text-white mb-6">{selectedRoom}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <RoomCard
              type="climate"
              title="Heating & Climate"
              value="Room Temperature: 22°C"
              subtitle="Humidity: 45%"
            />
            <RoomCard
              type="lighting"
              title="Lighting Control"
            />
            <RoomCard
              type="entertainment"
              title="Entertainment"
            />
            <RoomCard
              type="energy"
              title="Energy Monitoring"
            />
            <RoomCard
              type="voice"
              title="Voice Assistant"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room}
              onClick={() => handleRoomSelect(room)}
              className="cursor-pointer"
            >
              <RoomCard
                type="climate"
                title={room}
                icon={<Home className="w-8 h-8 text-primary" />}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
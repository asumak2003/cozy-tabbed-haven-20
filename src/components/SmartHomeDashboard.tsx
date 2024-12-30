import { useState } from "react";
import { RoomCard } from "./RoomCard";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { TemperatureControl } from "./TemperatureControl";
import { LightingControl } from "./LightingControl";

const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom"];
const features = ["Climate", "Lighting", "Entertainment", "Energy", "Voice"];

export const SmartHomeDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
    setSelectedFeature(null);
  };

  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature);
  };

  const handleBack = () => {
    if (selectedFeature) {
      setSelectedFeature(null);
    } else {
      setSelectedRoom(null);
    }
  };

  const renderFeatureContent = () => {
    switch (selectedFeature?.toLowerCase()) {
      case "climate":
        return <TemperatureControl />;
      case "lighting":
        return <LightingControl />;
      default:
        return <div className="text-white">Feature coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        SMART HOME DASHBOARD
      </h1>

      {(selectedRoom || selectedFeature) && (
        <Button
          variant="ghost"
          className="mb-6 text-primary hover:text-primary/90"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back {selectedFeature ? "to Features" : "to Rooms"}
        </Button>
      )}

      {selectedFeature ? (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {selectedRoom} → {selectedFeature}
          </h2>
          <div className="max-w-md mx-auto">
            {renderFeatureContent()}
          </div>
        </div>
      ) : selectedRoom ? (
        <>
          <h2 className="text-2xl font-semibold text-white mb-6">{selectedRoom}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature) => (
              <div
                key={feature}
                onClick={() => handleFeatureSelect(feature)}
                className="cursor-pointer"
              >
                <RoomCard
                  type={feature.toLowerCase() as any}
                  title={feature}
                />
              </div>
            ))}
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
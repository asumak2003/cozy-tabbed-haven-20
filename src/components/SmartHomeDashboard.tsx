import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RoomCard } from "./RoomCard";

const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom"];
const features = ["Climate", "Lighting", "Entertainment", "Energy", "Voice"];

export const SmartHomeDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  return (
    <div className="min-h-screen bg-[#1a1b26] p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        SMART HOME DASHBOARD
      </h1>

      <Tabs defaultValue={rooms[0]} className="w-full max-w-6xl mx-auto">
        <TabsList className="w-full justify-start mb-6 bg-secondary/50 p-1">
          {rooms.map((room) => (
            <TabsTrigger
              key={room}
              value={room}
              className="data-[state=active]:bg-primary data-[state=active]:text-white px-6"
              onClick={() => setSelectedRoom(room)}
            >
              {room}
            </TabsTrigger>
          ))}
        </TabsList>

        {rooms.map((room) => (
          <TabsContent key={room} value={room}>
            <Tabs defaultValue="Climate" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-secondary/50 p-1">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature}
                    value={feature}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white px-6"
                  >
                    {feature}
                  </TabsTrigger>
                ))}
              </TabsList>

              {features.map((feature) => (
                <TabsContent key={feature} value={feature}>
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
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
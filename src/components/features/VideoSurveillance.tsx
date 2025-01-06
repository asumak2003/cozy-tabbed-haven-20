import { useState } from "react";
import { Camera, Unlock, Video } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface CameraWindow {
  id: string;
  name: string;
  location: string;
}

const cameras: CameraWindow[] = [
  { id: "front", name: "Front Door", location: "Entrance" },
  { id: "living", name: "Living Room", location: "Main Area" },
  { id: "kitchen", name: "Kitchen", location: "Kitchen Area" },
  { id: "backyard", name: "Backyard", location: "Exterior" },
  { id: "garage", name: "Garage", location: "Exterior" }
];

export const VideoSurveillance = () => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const handleOpenDoor = () => {
    toast.success("Door unlocked successfully");
    setTimeout(() => {
      toast.info("Door automatically locked");
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-card rounded-lg p-4 cursor-pointer hover:bg-card/80 transition-colors"
            onClick={() => setSelectedCamera(camera.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{camera.name}</h3>
              <Camera className="text-primary h-5 w-5" />
            </div>
            <p className="text-sm text-gray-400">{camera.location}</p>
            {selectedCamera === camera.id && (
              <div className="mt-4 bg-black/90 aspect-video rounded-lg flex items-center justify-center">
                <Video className="h-8 w-8 text-primary/50" />
              </div>
            )}
            {camera.id === "front" && (
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDoor();
                }}
              >
                <Unlock className="mr-2 h-4 w-4" />
                Open Door
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
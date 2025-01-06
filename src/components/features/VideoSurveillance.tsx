import { useState } from "react";
import { Camera, Unlock, Video, ArrowLeft, Home } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface VideoSurveillanceProps {
  onBack: () => void;
}

interface CameraWindow {
  id: string;
  name: string;
  location: string;
}

const cameras: CameraWindow[] = [
  { id: "living", name: "Living Room", location: "Main Area" },
  { id: "kitchen", name: "Kitchen", location: "Kitchen Area" },
  { id: "backyard", name: "Backyard", location: "Exterior" },
  { id: "garage", name: "Garage", location: "Exterior" }
];

export const VideoSurveillance = ({ onBack }: VideoSurveillanceProps) => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [showOtherCameras, setShowOtherCameras] = useState(false);

  const handleOpenDoor = () => {
    toast.success("Door unlocked successfully");
    setTimeout(() => {
      toast.info("Door automatically locked");
    }, 5000);
  };

  const renderFrontDoor = () => (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Front Door Camera</h3>
        <Camera className="text-primary h-6 w-6" />
      </div>
      <div className="bg-black/90 aspect-video rounded-lg flex items-center justify-center mb-4">
        <Video className="h-12 w-12 text-primary/50" />
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleOpenDoor}
      >
        <Unlock className="mr-2 h-4 w-4" />
        Open Door
      </Button>
    </div>
  );

  const renderOtherCameras = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Video Surveillance</h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowOtherCameras(!showOtherCameras)}
          >
            {showOtherCameras ? "Show Front Door" : "View Other Cameras"}
          </Button>
          <Button
            variant="secondary"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      
      {showOtherCameras ? renderOtherCameras() : renderFrontDoor()}
    </div>
  );
};
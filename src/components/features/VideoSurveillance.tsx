import { useState } from "react";
import { Camera, Unlock, Video, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface VideoSurveillanceProps {
  onBack: () => void;
}

interface CameraWindow {
  id: string;
  name: string;
  location: string;
}

const PIN = "1234";

const cameras: CameraWindow[] = [
  { id: "living", name: "Living Room", location: "Main Area" },
  { id: "kitchen", name: "Kitchen", location: "Kitchen Area" },
  { id: "backyard", name: "Backyard", location: "Exterior" },
  { id: "garage", name: "Garage", location: "Exterior" }
];

export const VideoSurveillance = ({ onBack }: VideoSurveillanceProps) => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [showOtherCameras, setShowOtherCameras] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOpenDoor = () => {
    toast.success("Door unlocked successfully");
    setTimeout(() => {
      toast.info("Door automatically locked");
    }, 5000);
  };

  const handleAuthenticate = () => {
    if (pin === PIN) {
      setIsAuthenticated(true);
      setShowOtherCameras(true);
      setPin("");
      setShowPinDialog(false);
      toast.success("Access granted");
    } else {
      toast.error("Incorrect PIN");
      setPin("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Video Surveillance</h2>
        <div className="flex gap-2">
          {!showPinDialog && !isAuthenticated && (
            <Button 
              variant="outline" 
              onClick={() => setShowPinDialog(true)}
              className="bg-card hover:bg-card/80"
            >
              View Other Cameras
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={onBack}
            className="bg-card hover:bg-card/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Front Door Camera</h3>
            <Camera className="text-primary h-5 w-5" />
          </div>
          <div className="bg-black/90 aspect-video rounded-lg flex items-center justify-center mb-2">
            <Video className="h-8 w-8 text-primary/50" />
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

        {isAuthenticated && showOtherCameras && (
          <div className="grid grid-cols-1 gap-4">
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
        )}
      </div>

      {showPinDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Enter PIN to View Other Cameras</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type={showPin ? "text" : "password"}
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="bg-background"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPin(!showPin)}
                  className="shrink-0"
                >
                  {showPin ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setShowPinDialog(false);
                    setPin("");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAuthenticate}>Confirm</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
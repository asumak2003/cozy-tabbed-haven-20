import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface VideoSurveillanceProps {
  onBack: () => void;
}

export const VideoSurveillance = ({ onBack }: VideoSurveillanceProps) => {
  const [selectedCamera, setSelectedCamera] = useState("living");
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState("");

  const getCameraLabel = (camera: string) => {
    switch (camera) {
      case "living":
        return "Living Room Camera";
      case "bedroom":
        return "Bedroom Camera";
      case "kitchen":
        return "Kitchen Camera";
      case "bathroom":
        return "Bathroom Camera";
      case "front":
        return "Front Door Camera";
      default:
        return "Unknown Camera";
    }
  };

  const handleCameraChange = (value: string) => {
    if (value === "front") {
      setShowPinDialog(true);
    } else {
      setSelectedCamera(value);
    }
  };

  const handlePinSubmit = () => {
    if (pin === "1234") {
      setSelectedCamera("front");
      setShowPinDialog(false);
      setPin("");
    } else {
      toast.error("Incorrect PIN!");
    }
  };

  const handleOpenDoor = () => {
    toast.success("Door command sent");
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-semibold text-white">Video Surveillance</h2>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      <div className="space-y-4">
        <Select value={selectedCamera} onValueChange={handleCameraChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select camera" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="living">Living Room Camera</SelectItem>
            <SelectItem value="bedroom">Bedroom Camera</SelectItem>
            <SelectItem value="kitchen">Kitchen Camera</SelectItem>
            <SelectItem value="bathroom">Bathroom Camera</SelectItem>
            <SelectItem value="front">Front Door Camera</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-full max-w-3xl mx-auto aspect-video bg-black/90 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="h-12 w-12 mx-auto mb-2 text-primary" />
            <p className="text-lg">
              {getCameraLabel(selectedCamera)}
            </p>
          </div>
        </div>

        {selectedCamera === "front" && (
          <Button 
            onClick={handleOpenDoor}
            className="w-full max-w-3xl mx-auto bg-primary hover:bg-primary/80"
          >
            Open Door
          </Button>
        )}
      </div>

      {showPinDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Enter PIN to access Front Door Camera</h3>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-background text-black"
              />
              <Button
                variant="ghost"
                onClick={() => {
                  setShowPinDialog(false);
                  setPin("");
                }}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handlePinSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { Button } from "../ui/button";
import { Wifi } from "lucide-react";
import { toast } from "sonner";

export const EmptyFeature = () => {
  const handleConnect = () => {
    toast.info("Searching for devices...");
    // In a real app, this would initiate device discovery
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <Wifi className="w-16 h-16 text-primary animate-pulse" />
      <h3 className="text-xl font-semibold text-white">Connect a Device</h3>
      <p className="text-gray-400 text-center max-w-md">
        No device connected. Click below to search for and connect to available devices.
      </p>
      <Button onClick={handleConnect} className="mt-4">
        Connect Device
      </Button>
    </div>
  );
};
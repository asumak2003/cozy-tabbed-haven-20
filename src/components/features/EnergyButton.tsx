import { Gauge } from "lucide-react";
import { Button } from "../ui/button";

interface EnergyButtonProps {
  onClick: () => void;
}

export const EnergyButton = ({ onClick }: EnergyButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full mt-6 bg-card hover:bg-card/80"
      onClick={onClick}
    >
      <Gauge className="mr-2 h-5 w-5" />
      Energy Management
    </Button>
  );
};
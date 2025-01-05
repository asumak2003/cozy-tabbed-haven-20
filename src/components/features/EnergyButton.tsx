import { Gauge } from "lucide-react";

interface EnergyButtonProps {
  onClick: () => void;
}

export const EnergyButton = ({ onClick }: EnergyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card hover:bg-card/80 transition-all duration-300 rounded-lg p-4 flex items-center justify-center gap-3 border border-primary/20 shadow-lg hover:shadow-primary/20"
    >
      <Gauge className="w-6 h-6 text-primary" />
      <span className="text-lg font-semibold text-white">Energy Management</span>
    </button>
  );
};
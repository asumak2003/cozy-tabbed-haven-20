import { Card } from "@/components/ui/card";
import { 
  Thermometer, 
  Lightbulb, 
  Film, 
  Battery, 
  Volume2 
} from "lucide-react";
import { ReactNode } from "react";
import { TemperatureControl } from "./TemperatureControl";
import { LightingControl } from "./LightingControl";

interface RoomCardProps {
  type: "climate" | "lighting" | "entertainment" | "energy" | "voice";
  title: string;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
  expanded?: boolean;
  onClick?: () => void;
}

const icons = {
  climate: Thermometer,
  lighting: Lightbulb,
  entertainment: Film,
  energy: Battery,
  voice: Volume2,
};

export const RoomCard = ({ 
  type, 
  title, 
  value, 
  subtitle, 
  icon, 
  expanded = false,
  onClick 
}: RoomCardProps) => {
  const Icon = icons[type];

  return (
    <Card 
      className="p-6 bg-secondary hover:bg-secondary/90 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-4">
        {icon ? icon : <Icon className="w-8 h-8 text-primary" />}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {!expanded && value && <p className="text-sm text-gray-300">{value}</p>}
        {!expanded && subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        
        {expanded && type === "climate" && <TemperatureControl />}
        {expanded && type === "lighting" && <LightingControl />}
      </div>
    </Card>
  );
};
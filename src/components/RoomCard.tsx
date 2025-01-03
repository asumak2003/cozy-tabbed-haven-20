import { Card } from "@/components/ui/card";
import { 
  Thermometer, 
  Lightbulb, 
  Film, 
  Battery, 
  Volume2,
  LucideIcon 
} from "lucide-react";
import { ReactNode } from "react";

interface RoomCardProps {
  type: "climate" | "lighting" | "entertainment" | "energy" | "voice";
  title: string;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
}

const icons: Record<string, LucideIcon> = {
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
  icon
}: RoomCardProps) => {
  const Icon = icons[type.toLowerCase()];

  return (
    <Card 
      className="p-6 bg-secondary hover:bg-secondary/90 transition-colors cursor-pointer"
    >
      <div className="flex flex-col items-center gap-4">
        {icon ? icon : Icon && <Icon className="w-8 h-8 text-primary" />}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {value && <p className="text-sm text-gray-300">{value}</p>}
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </Card>
  );
};
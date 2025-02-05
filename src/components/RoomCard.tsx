import { Card } from "@/components/ui/card";
import { 
  Thermometer, 
  Lightbulb, 
  Film, 
  Battery, 
  Volume2,
  Settings,
  Trash2,
  LucideIcon 
} from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  type: "climate" | "lighting" | "entertainment" | "energy" | "voice";
  title: string;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
  onDelete?: () => void;
  showDelete?: boolean;
  className?: string;
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
  icon,
  onDelete,
  showDelete = true,
  className,
}: RoomCardProps) => {
  const IconComponent = icons[type.toLowerCase()] || Settings;

  return (
    <Card className={cn(
      "p-6 bg-secondary hover:bg-secondary/90 transition-colors cursor-pointer relative h-full",
      className
    )}>
      {showDelete && onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      )}
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        {icon ? icon : <IconComponent className="w-8 h-8 text-primary" />}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {value && <p className="text-sm text-gray-300">{value}</p>}
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </Card>
  );
};
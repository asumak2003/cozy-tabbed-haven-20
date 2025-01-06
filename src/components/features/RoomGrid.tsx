import { Home, ChefHat, Bath } from "lucide-react";
import { RoomCard } from "../RoomCard";

interface RoomGridProps {
  rooms: string[];
  onRoomSelect: (room: string) => void;
  onRoomDelete: (room: string) => void;
}

export const RoomGrid = ({ rooms, onRoomSelect, onRoomDelete }: RoomGridProps) => {
  const getRoomIcon = (room: string) => {
    switch (room.toLowerCase()) {
      case "kitchen":
        return <ChefHat className="w-8 h-8 text-primary" />;
      case "bathroom":
        return <Bath className="w-8 h-8 text-primary" />;
      default:
        return <Home className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {rooms.map((room) => (
        <div
          key={room}
          onClick={() => onRoomSelect(room)}
        >
          <RoomCard
            type="climate"
            title={room}
            icon={getRoomIcon(room)}
            onDelete={() => onRoomDelete(room)}
          />
        </div>
      ))}
    </div>
  );
};
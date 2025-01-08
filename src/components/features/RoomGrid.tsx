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

  // Calculate the number of columns based on the number of rooms
  const getGridCols = (count: number) => {
    if (count <= 3) return `grid-cols-${count}`;
    if (count === 4) return "grid-cols-2 md:grid-cols-4";
    if (count === 5) return "grid-cols-3 md:grid-cols-5";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className={`grid ${getGridCols(rooms.length)} gap-6 auto-rows-fr w-full max-w-7xl`}>
          {rooms.map((room) => (
            <div
              key={room}
              onClick={() => onRoomSelect(room)}
              className="flex"
            >
              <RoomCard
                type="climate"
                title={room}
                icon={getRoomIcon(room)}
                onDelete={() => onRoomDelete(room)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
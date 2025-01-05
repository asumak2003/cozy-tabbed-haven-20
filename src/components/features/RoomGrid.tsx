import { Home } from "lucide-react";
import { RoomCard } from "../RoomCard";

interface RoomGridProps {
  rooms: string[];
  onRoomSelect: (room: string) => void;
  onRoomDelete: (room: string) => void;
}

export const RoomGrid = ({ rooms, onRoomSelect, onRoomDelete }: RoomGridProps) => {
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
            icon={<Home className="w-8 h-8 text-primary" />}
            onDelete={() => onRoomDelete(room)}
          />
        </div>
      ))}
    </div>
  );
};
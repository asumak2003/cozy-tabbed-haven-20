import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { TemperatureControl } from "./TemperatureControl";
import { LightingControl } from "./LightingControl";
import { VolumeControl } from "./VolumeControl";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { NavigationButtons } from "./navigation/NavigationButtons";
import { EmptyFeature } from "./features/EmptyFeature";
import { DeleteConfirmationDialog } from "./dialogs/DeleteConfirmationDialog";
import { EnergyManagement } from "./features/EnergyManagement";
import { VoiceAssistant } from "./features/VoiceAssistant";
import { HomeScreen } from "./features/HomeScreen";
import { RoomCard } from "./RoomCard";

const PIN = "1234";
const defaultFeatures = ["Lights", "Heating System", "Entertainment"];

export const SmartHomeDashboard = () => {
  const [rooms, setRooms] = useState(["Living Room", "Bedroom", "Kitchen", "Bathroom"]);
  const [features, setFeatures] = useState(defaultFeatures);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showEnergyManagement, setShowEnergyManagement] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newFeatureName, setNewFeatureName] = useState("");
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [pin, setPin] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: "room" | "feature";
    name: string;
  }>({ isOpen: false, type: "room", name: "" });

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
    setSelectedFeature(null);
  };

  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature);
  };

  const handleAddRoom = () => {
    if (pin !== PIN) {
      toast.error("Incorrect PIN!");
      return;
    }

    if (newRoomName.trim()) {
      if (rooms.includes(newRoomName.trim())) {
        toast.error("Room already exists!");
        return;
      }
      setRooms([...rooms, newRoomName.trim()]);
      setNewRoomName("");
      setPin("");
      setShowAddRoom(false);
      toast.success("Room added successfully!");
    }
  };

  const handleAddFeature = () => {
    if (newFeatureName.trim()) {
      if (features.includes(newFeatureName.trim())) {
        toast.error("Feature already exists!");
        return;
      }
      setFeatures([...features, newFeatureName.trim()]);
      setNewFeatureName("");
      setShowAddFeature(false);
      toast.success("Feature added successfully!");
    }
  };

  const handleEnergyManagement = () => {
    setShowEnergyManagement(true);
    setSelectedRoom(null);
    setSelectedFeature(null);
  };

  const handleDeleteRoom = (room: string) => {
    setDeleteDialog({ isOpen: true, type: "room", name: room });
  };

  const handleDeleteFeature = (feature: string) => {
    if (defaultFeatures.includes(feature)) {
      toast.error("Cannot delete default features!");
      return;
    }
    setDeleteDialog({ isOpen: true, type: "feature", name: feature });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.type === "room") {
      setRooms(rooms.filter(room => room !== deleteDialog.name));
      if (selectedRoom === deleteDialog.name) {
        setSelectedRoom(null);
        setSelectedFeature(null);
      }
      toast.success("Room deleted successfully!");
    } else {
      setFeatures(features.filter(feature => feature !== deleteDialog.name));
      if (selectedFeature === deleteDialog.name) {
        setSelectedFeature(null);
      }
      toast.success("Feature deleted successfully!");
    }
    setDeleteDialog({ isOpen: false, type: "room", name: "" });
  };

  const handleHome = () => {
    setSelectedRoom(null);
    setSelectedFeature(null);
    setShowEnergyManagement(false);
  };

  const handleBack = () => {
    if (showEnergyManagement) {
      setShowEnergyManagement(false);
    } else if (selectedFeature) {
      setSelectedFeature(null);
    } else if (selectedRoom) {
      setSelectedRoom(null);
    }
  };

  const renderFeatureContent = () => {
    switch (selectedFeature?.toLowerCase()) {
      case "lights":
        return <LightingControl />;
      case "heating system":
        return <TemperatureControl />;
      case "entertainment":
        return <VolumeControl />;
      default:
        return <EmptyFeature />;
    }
  };

  const showBackButton = Boolean(selectedRoom || selectedFeature || showEnergyManagement);

  return (
    <div className="min-h-screen bg-[#1a1b26] p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-primary">
          SMART HOME DASHBOARD
        </h1>
        <div className="flex items-center gap-4">
          {!selectedFeature && !selectedRoom && !showEnergyManagement && (
            <Button onClick={() => setShowAddRoom(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          )}
          {selectedRoom && !selectedFeature && (
            <Button onClick={() => setShowAddFeature(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          )}
          {showBackButton && (
            <NavigationButtons
              showBackButton={showBackButton}
              selectedFeature={selectedFeature}
              onBack={handleBack}
              onHome={handleHome}
            />
          )}
        </div>
      </div>

      {showEnergyManagement ? (
        <EnergyManagement />
      ) : selectedFeature ? (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {selectedRoom} → {selectedFeature}
          </h2>
          <div className="max-w-6xl mx-auto">
            {renderFeatureContent()}
          </div>
        </div>
      ) : selectedRoom ? (
        <>
          <h2 className="text-2xl font-semibold text-white mb-6">{selectedRoom}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature) => (
              <div
                key={feature}
                onClick={() => handleFeatureSelect(feature)}
              >
                <RoomCard
                  type={feature.toLowerCase() as any}
                  title={feature}
                  onDelete={() => handleDeleteFeature(feature)}
                  showDelete={!defaultFeatures.includes(feature)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <HomeScreen 
          rooms={rooms}
          onRoomSelect={handleRoomSelect}
          onRoomDelete={handleDeleteRoom}
          onEnergyManagement={handleEnergyManagement}
        />
      )}

      {showAddRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Room</h3>
            <div className="space-y-4">
              <Input
                placeholder="Enter room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="bg-background"
              />
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-background"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setShowAddRoom(false);
                    setPin("");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddRoom}>Add Room</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Feature</h3>
            <div className="space-y-4">
              <Input
                placeholder="Enter feature name"
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
                className="bg-background"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddFeature(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFeature}>Add Feature</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, type: "room", name: "" })}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.name}
      />

      <VoiceAssistant />
    </div>
  );
};

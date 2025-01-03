import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface NavigationButtonsProps {
  showBackButton: boolean;
  selectedFeature: string | null;
  onBack: () => void;
  onHome: () => void;
}

export const NavigationButtons = ({
  showBackButton,
  selectedFeature,
  onBack,
  onHome,
}: NavigationButtonsProps) => {
  return (
    <div className="flex gap-2">
      {showBackButton && (
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/90"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back {selectedFeature ? "to Features" : "to Rooms"}
        </Button>
      )}
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/90"
        onClick={onHome}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Button>
    </div>
  );
};
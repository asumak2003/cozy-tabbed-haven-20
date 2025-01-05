import { useState } from "react";
import { Mic } from "lucide-react";
import { toast } from "sonner";

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(true);
    // Simulate voice assistant behavior
    toast.success("Hello! How can I help you with your smart home today?");
    setTimeout(() => {
      setIsListening(false);
      toast.info("Listening...");
    }, 2000);
  };

  return (
    <button
      onClick={handleVoiceClick}
      className={`fixed bottom-6 right-6 p-4 rounded-full transition-all duration-300 ${
        isListening 
          ? "bg-primary/90 scale-110" 
          : "bg-primary hover:bg-primary/90"
      }`}
    >
      <Mic className={`w-6 h-6 text-white ${isListening ? "animate-pulse" : ""}`} />
    </button>
  );
};
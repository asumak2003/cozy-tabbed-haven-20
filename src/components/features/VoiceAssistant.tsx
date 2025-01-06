import { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import { toast } from "sonner";

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      const handleClickOutside = () => {
        setIsListening(false);
        toast.dismiss(); // Dismiss any existing toasts
      };

      // Add the event listener with a slight delay to prevent immediate triggering
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isListening]);

  const handleVoiceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsListening(true);
    toast.success("Hello! How can I help you with your smart home today?");
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
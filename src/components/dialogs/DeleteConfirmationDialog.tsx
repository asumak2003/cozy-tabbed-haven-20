import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationDialogProps) => {
  const [pin, setPin] = useState("");
  const correctPin = "1234"; // In a real app, this would be stored securely

  const handleConfirm = () => {
    if (pin === correctPin) {
      onConfirm();
      onClose();
      setPin("");
    } else {
      toast.error("Incorrect PIN");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemName}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this {itemName.toLowerCase()}? This action cannot be undone.
            Please enter PIN to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <Input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="max-w-[200px]"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
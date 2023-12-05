"use client";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertCalcModal = () => {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>No Personalized Data Available</AlertDialogTitle>
          <AlertDialogDescription>
            Please fill out the form to calculate your personal nutritional
            requirements.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => router.push("/")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push("/profile")}>
            Calculate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCalcModal;

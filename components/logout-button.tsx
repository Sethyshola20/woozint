"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export function LogoutButton() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={
            theme === "light"
              ? "bg-white hover:bg-gray-100 text-gray-800"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }
          variant="destructive"
        >
          Se déconnecter
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Vous devrez vous reconnecter pour accéder à votre compte.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Se déconnecter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { toast } from "@components/hooks/use-toast";
import { useTheme } from "next-themes";
import { RegisterFormData, registerFormSchema } from "zodValidation";
import { registerAction } from "../_action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: RegisterFormData) {
    try {
      await registerAction(values);
      toast({
        title: "Succès",
        description: "Compte créé avec succès",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-muted-foreground">
            Entrez vos informations pour créer votre compte
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse e-mail</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={
                theme === "light"
                  ? "bg-black text-white w-full"
                  : "bg-white text-black w-full"
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer un compte"}
            </Button>

            <p className="text-center text-sm">
              Déjà un compte?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

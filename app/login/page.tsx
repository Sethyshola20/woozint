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
import { LoginFormData, loginFormSchema } from "zodValidation";
import Link from "next/link";
import { loginUseCase } from "./use_case";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { theme } = useTheme();
const router = useRouter()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: LoginFormData) {
    try {
      // Add your login logic here
      await loginUseCase(values);
        router.push("/dashboard")
    } catch (error: unknown) {
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
          <h1 className="text-2xl font-bold">Bienvenue</h1>
          <p className="text-muted-foreground">
            Entrez vos identifiants pour accéder à votre compte
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
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
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
            <p className="text-center text-sm">
              Déjà un compte?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                S&apos;inscrire
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

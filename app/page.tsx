"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import { toast } from "./components/hooks/use-toast";
import { Toaster } from "./components/ui/toaster";
import { FormDataType, formSchema } from "./zodValidation";
import { Card, CardContent } from "./components/ui/card";
import { useTheme } from "next-themes";
import Link from "next/link";
import { formAction } from "./_action";
import { ModeToggle, SearchTypeToggle } from "@components/ui/toggle-theme";
import { useState } from "react";

export default function Home() {
  const [searchByEmail, setSearchByEmail] = useState(true);
  const [person, setPerson] = useState<
    | {
        email: string;
        name: string;
        id: string;
        geolocCreateMail: string;
        dateCreateMail: Date;
        passwordMzailleaked: string;
        x: string;
        facebook: string;
        linkedin: string;
        instagram: string;
      }
    | undefined
  >(undefined);
  const { theme } = useTheme();

  async function sendData(data: FormDataType) {
    try {
      const person = await formAction(data);
    } catch (error: unknown) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    }
  }
  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
    },
  });
  const { isSubmitting } = form.formState;
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <nav className="flex w-full justify-between items-center p-6">
        <ModeToggle />
        <SearchTypeToggle setSearchByEmail={setSearchByEmail} />
      </nav>
      <Card>
        <CardContent className="w-[50vw] p-6">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(sendData)}>
              {searchByEmail ? (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre adresse email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="email" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} type="email" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} type="email" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button
                variant="outline"
                type="submit"
                className={
                  theme === "light"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              >
                {isSubmitting ? "Recherche..." : "Rechercher"}
              </Button>
            </form>
          </Form>
          <Toaster />
        </CardContent>
      </Card>

      {person && (
        <Card>
          <CardContent className="w-[50vw] p-6">
            <h1>{person.name}</h1>
            <p>{person.email}</p>
            <p>{person.geolocCreateMail}</p>
            <p>{person.passwordMzailleaked}</p>
            <p>{person.x}</p>
            <p>{person.facebook}</p>
            <p>{person.linkedin}</p>
            <p>{person.instagram}</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

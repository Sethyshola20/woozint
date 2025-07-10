"use client";

import { FormDataType, formSchema, searchNameSchema, searchType } from "../app/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useTheme } from "next-themes";
import { formAction, nameAction, PersonWithComment } from "_action";
import { toast } from "@components/hooks/use-toast";

export function SearchByName({
  setPerson,
}: {
  setPerson: React.Dispatch<
    React.SetStateAction<PersonWithComment | undefined>
  >;
}) {
  const { theme } = useTheme();

  const form = useForm<searchType>({
    resolver: zodResolver(searchNameSchema),
    defaultValues: {
      nom: "",
      prenom: "",
    },
  });

  async function onSubmit(data: searchType) {
    try {
      const person = await nameAction(data)
      if (!person) throw new Error("Person not found");
      setPerson(person);
    } catch (error: unknown) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <Button
            type="submit"
            className={
              theme === "light"
                ? "bg-black text-white "
                : "bg-white text-black "
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? "Recherche..." : "Rechercher"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function SearchEmailForm({
  setPerson,
}: {
  setPerson: React.Dispatch<
    React.SetStateAction<PersonWithComment | undefined>
  >;
}){

  const { theme } = useTheme();
  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
    },
  });

  async function onSubmit(data: FormDataType) {
    console.log('front',data)
    try {
      const person = await formAction(data)
      if (!person) throw new Error("Person not found");
      setPerson(person);
    } catch (error: unknown) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    }
  }

  const { isSubmitting } = form.formState;

  return(
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          <Button
            type="submit"
            className={
              theme === "light"
                ? "bg-black text-white "
                : "bg-white text-black "
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? "Recherche..." : "Rechercher"}
          </Button>
        </form>
      </Form>
  )
}
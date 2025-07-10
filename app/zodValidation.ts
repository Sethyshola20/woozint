import { z } from "zod"


export const formSchema = z.object({
    prenom: z.string(),
    nom: z.string(),
    email: z.string().email(),
});

export const searchNameSchema = z.object({
   prenom: z.string(),
    nom: z.string(),
})

export type searchType =  z.infer<typeof searchNameSchema>
export type FormDataType = z.infer<typeof formSchema>;


export const loginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;


export const registerFormSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

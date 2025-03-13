import { z } from "zod"


export const formSchema = z.object({
    prenom: z.string(),
    nom: z.string(),
    email: z.string().email(),
});

export type FormDataType = z.infer<typeof formSchema>;


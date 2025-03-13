"use server"

import { FormDataType } from "../zodValidation";
import { prisma } from "@lib/prisma";

export async function formAction(data: FormDataType) {
    try {
        if (!data.email && !data.prenom && !data.nom) {
            throw new Error("Veuillez remplir au moins un champ");
        }
        if (data.email) {
            const user = await prisma.person.findUnique({
                where: {
                    email: data.email
                }
            });
            if (user) {
                console.log(user);
                return user;
            }
            throw new Error("Aucun utilisateur trouvé");
        }
        if (data.prenom && data.nom) {
            const user = await prisma.person.findFirst({
                where: {
                    AND: [
                        {
                            name: data.nom
                        },
                        {
                            email: data.prenom
                        }
                    ]
                }
            });
            if (user) {
                console.log(user);
                return user;
            }
            throw new Error("Aucun utilisateur trouvé");
        }

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}
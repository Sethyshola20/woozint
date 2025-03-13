"use server"

import { Comment, Person } from "@prisma/client";
import { FormDataType } from "../zodValidation";
import { prisma } from "@lib/prisma";


export type PersonWithComment = Person & {
    commentgooggle: Comment[]
}
export async function formAction(data: FormDataType): Promise<PersonWithComment | undefined> {
    try {
        if (!data.email && !data.prenom && !data.nom) {
            throw new Error("Veuillez remplir au moins un champ");
        }
        if (data.email) {
            const user = await prisma.person.findUnique({
                where: {
                    email: data.email
                },
                include: {
                    commentgooggle: true
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
                }, include: {
                    commentgooggle: true
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
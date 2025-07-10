"use server"

import { Comment, Person } from "@prisma/client";
import { FormDataType, LoginFormData, loginFormSchema, searchType } from "../zodValidation";
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterFormData } from "../zodValidation";
import { z } from "zod";
import fs from "fs";
import path from "path";

const seedFilePath = path.join(process.cwd(), "data", "seed.json");
const seedData = JSON.parse(fs.readFileSync(seedFilePath, "utf-8"));

export type PersonWithComment = Person & {
    commentgooggle: Comment[]
}
export async function formAction(data: FormDataType): Promise<PersonWithComment | undefined> {
    try {
        if (!data.email && !data.prenom && !data.nom) {
            throw new Error("Veuillez remplir au moins un champ");
        }
        if (data.email) {
            const user = seedData.find((user: any) => user.email === data.email);
            if (user) {
                return user;
            }
            throw new Error("Aucun utilisateur trouvé");
        }
        if (data.prenom && data.nom) {
            const user = seedData.find((user: any) => user.name.toLowerCase() === `${data.prenom.toLowerCase()} ${data.nom.toLowerCase()}`);
            if (user) {
                return user;
            }
            throw new Error("Aucun utilisateur trouvé");
        }

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}

export async function nameAction(data:searchType){
    try {
    
        if (data.prenom && data.nom) {
            const user = seedData.find((user: any) => user.name.toLowerCase() === `${data.prenom.toLowerCase()} ${data.nom.toLowerCase()}`);
            
            if (user) {
                return user
            }
            

            throw new Error("Aucun utilisateur trouvé");
        }

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}

export async function loginUseCase(data: LoginFormData) {
    try {
        loginFormSchema.parse(data)
        const user = seedData.find((user: any) => user.email === data.email);
        if (!user) {
            throw new Error("Aucun utilisateur trouvé");
        }
        // As we don't have passwords in seed.json, we'll consider the login successful if the email exists.
        // You might want to implement a more secure check here if needed.
        return { data: { user }, error: null };
    } catch (error) {
        return { data: null, error: error instanceof z.ZodError ? error.errors : error };
    }
}

export async function registerAction(data: RegisterFormData) {
    try {
        const existingUser = seedData.find((user: any) => user.email === data.email);

        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà");
        }

        // This is a mock registration. We are not writing to the seed.json file.
        const newUser = {
            id: Math.random().toString(36).substring(2, 15),
            email: data.email,
            role: "USER",
        };

        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        (await cookies()).set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return {
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        };
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}
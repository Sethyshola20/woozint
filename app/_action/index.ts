"use server"

import { Comment, Person } from "@prisma/client";
import { FormDataType, LoginFormData } from "../zodValidation";
import { prisma } from "@lib/prisma";
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterFormData } from "../zodValidation";


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

export async function loginAction(data: LoginFormData) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            },
        });

        if (!user) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
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
                id: user.id,
                email: user.email,
                role: user.role
            }
        };

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}

export async function registerAction(data: RegisterFormData) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: "USER", // Default role
            },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
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
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
}
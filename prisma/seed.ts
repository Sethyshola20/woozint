import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    try {
        // Nettoyage de la base de données
        await prisma.comment.deleteMany({});
        await prisma.article.deleteMany({});
        await prisma.person.deleteMany({});

        // Lecture du fichier JSON
        const rawData = fs.readFileSync(
            path.join(__dirname, '../data/seed.json'),
            'utf-8'
        );
        const users = JSON.parse(rawData);
        console.log
        console.log('🌱 Début du seeding...');

        for (const userData of users) {
            // Conversion de la date du format FR vers ISO
            const [day, month, year] = userData.dateCreateMail.split('/');
            const dateCreateMail = new Date(`${year}-${month}-${day}`);

            // Création de l'utilisateur
            const person = await prisma.person.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    geolocCreateMail: userData.geolocCreateMail,
                    dateCreateMail: dateCreateMail,
                    passwordMzailleaked: userData.passwordMzailleaked,
                    x: userData.x,
                    facebook: userData.facebook,
                    linkedin: userData.linkedin,
                    instagram: userData.instagram,
                    // Création des commentaires associés
                    commentgooggle: {
                        create: userData.commentgooggle.map((comment: any) => ({
                            enterpriseName: comment.enterpriseName || null,
                            comment: comment.comment || null,
                            titre: comment.titre || null,
                            description: comment.description || null,
                        })) || [],
                    },
                    // Création des articles associés
                    articles: {
                        create: userData.articles.map((article: any) => ({
                            titre: article.titre,
                            description: article.description,
                        })) || [],
                    },
                },
            });

            console.log(`✅ Utilisateur créé : ${person.name}`);
        }

        console.log('✨ Seeding terminé avec succès!');
    } catch (error) {
        console.error('❌ Erreur pendant le seeding:', error);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

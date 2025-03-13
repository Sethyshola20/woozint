"use client";

import { Button } from "./components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@components/ui/toggle-theme";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <nav className="flex justify-between items-center p-6 backdrop-blur-sm border-b">
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            WoozInt
          </h1>
          <ModeToggle />
        </div>

        <div className="flex-1 flex justify-end gap-4">
          <Button
            asChild
            variant="outline"
            className="hover:border-primary transition-colors"
          >
            <Link href="/login">Se connecter</Link>
          </Button>

          <Button
            asChild
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
          >
            <Link href="/register">S&apos;inscrire</Link>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Découvrez votre empreinte numérique
            </h2>

            <p className="text-xl text-muted-foreground">
              WoozInt vous aide à comprendre quelles informations personnelles
              sont disponibles publiquement sur internet.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 py-12">
            <div className="space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-colors duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-primary">
                Données Sociales
              </h3>
              <p className="text-muted-foreground">
                Retrouvez vos profils sur les réseaux sociaux et les
                informations publiques associées.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-colors duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-primary">
                Fuites de Données
              </h3>
              <p className="text-muted-foreground">
                Vérifiez si vos informations ont été compromises dans des fuites
                de données.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-colors duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-primary">
                Présence en Ligne
              </h3>
              <p className="text-muted-foreground">
                Analysez votre visibilité sur internet et les commentaires
                associés à votre nom.
              </p>
            </div>
          </div>

          <div className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-card/80 to-background border">
            <h3 className="text-3xl font-semibold text-primary">
              Prenez le contrôle de vos données personnelles
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              En comprenant votre présence en ligne, vous pouvez mieux protéger
              votre vie privée et gérer votre réputation numérique.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
              >
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

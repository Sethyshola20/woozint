"use client";

import { Button } from "./components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@components/ui/toggle-theme";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <nav className="flex justify-between items-center p-6 backdrop-blur-sm border-b">
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-2xl font-bold">WoozInt</h1>
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

      <main className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-6xl font-bold tracking-tight text-gradient animate-gradient">
              Découvrez votre empreinte numérique
            </h2>

            <p className="text-xl text-muted-foreground">
              WoozInt vous aide à comprendre quelles informations personnelles
              sont disponibles publiquement sur internet.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 py-12">
            {/* First Card */}
            <div className="group space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/30 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Données Sociales
              </h3>
              <p className="text-muted-foreground">
                Retrouvez vos profils sur les réseaux sociaux et les
                informations publiques associées.
              </p>
            </div>

            {/* Second Card */}
            <div className="group space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/30 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Fuites de Données
              </h3>
              <p className="text-muted-foreground">
                Vérifiez si vos informations ont été compromises dans des fuites
                de données.
              </p>
            </div>

            {/* Third Card */}
            <div className="group space-y-4 p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/30 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Présence en Ligne
              </h3>
              <p className="text-muted-foreground">
                Analysez votre visibilité sur internet et les commentaires
                associés à votre nom.
              </p>
            </div>
          </div>

          <div className="relative space-y-6 p-8 rounded-2xl bg-gradient-to-br from-background via-primary/5 to-background border backdrop-blur-sm">
            <div className="absolute inset-0 bg-grid-white/5 bg-grid-pattern rounded-2xl [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
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
                className="relative mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20"
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

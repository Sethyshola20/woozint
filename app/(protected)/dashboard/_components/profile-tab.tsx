"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { LogoutButton } from "../../../../components/logout-button";

export function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mon Profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Rôle</p>
            <p className="text-sm text-muted-foreground">Utilisateur</p>
          </div>
        </div>
        <LogoutButton />
      </CardContent>
    </Card>
  );
}

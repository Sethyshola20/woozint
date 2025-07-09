import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { LogoutButton } from "../../../../components/logout-button";
import { createClient } from "../../../../utils/supabase/server";
import { UserResponse } from "@supabase/supabase-js";

export function ProfileTab({user}:{user:UserResponse}) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mon Profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{user.data.user?.email}</p>
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

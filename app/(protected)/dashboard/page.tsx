"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Card } from "@components/ui/card";
import { SearchTab } from "./_components/search-tab";
import { ProfileTab } from "./_components/profile-tab";

export default function DashboardPage() {
  return (
    <div className="container py-10 w-full pr-6 pl-6 flex items-center">
      <Tabs defaultValue="search" className="space-y-4 w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Recherche OSINT</TabsTrigger>
          <TabsTrigger value="profile">Mon Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <SearchTab />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

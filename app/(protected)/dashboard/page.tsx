import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { SearchTab } from "./_components/search-tab";
import { ProfileTab } from "./_components/profile-tab";
import { createClient } from "../../../utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
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
          <ProfileTab user={user}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

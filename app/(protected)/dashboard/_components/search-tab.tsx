"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { SearchTypeToggle } from "@components/ui/toggle-theme";
import { SearchForm } from "../../../../components/search-form";
import { PersonWithComment } from "_action";
import { SearchResults } from "../../../../components/search-results";

export function SearchTab() {
  const [person, setPerson] = useState<PersonWithComment | undefined>(
    undefined
  );
  const [searchByEmail, setSearchByEmail] = useState(true);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Recherche OSINT</CardTitle>
          <SearchTypeToggle setSearchByEmail={setSearchByEmail} />
        </CardHeader>
        <CardContent className="p-6">
          <SearchForm searchByEmail={searchByEmail} setPerson={setPerson} />
        </CardContent>
      </Card>

      {person && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <SearchResults person={person} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

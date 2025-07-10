import { PersonWithComment } from "_action";

export function SearchResults({ person }: { person: PersonWithComment }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{person.name}</h2>
      <div className="grid gap-2">
        <p>{person.email}</p>
        <p>{person.geolocCreateMail}</p>
        <p>Leak ?: {person.passwordMzailleaked}</p>
        <p>{person.x}</p>
        <p>{person.facebook}</p>
        <p>{person.linkedin}</p>
        <p>{person.instagram}</p>
      </div>

      {person.commentgooggle.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Commentaires</h3>
          <ul className="space-y-4">
            {person.commentgooggle.map((comment) => (
              <li key={comment.id} className="space-y-2">
                <h4 className="font-medium">{comment.titre}</h4>
                <p className="text-sm text-muted-foreground">
                  {comment.description}
                </p>
                <p className="text-sm">{comment.enterpriseName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

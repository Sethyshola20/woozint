import { ModeToggle } from "@components/ui/toggle-theme";
import Link from "next/link";
import { LogoutButton } from "../../components/logout-button";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="flex w-full justify-between items-center p-6 border-b">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            WoozInt
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />

          <LogoutButton />
        </div>
      </nav>
      <main className="w-full">{children}</main>
    </div>
  );
}

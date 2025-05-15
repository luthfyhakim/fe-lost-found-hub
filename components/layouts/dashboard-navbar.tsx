import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function DashboardNavbar() {
  return (
    <header className="border-b px-4 md:px-6 lg:px-8 xl:px-12 sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-shadow">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Lost & Found Hub</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/report/lost"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Laporkan Hilang
          </Link>
          <Link
            href="/report/found"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Laporkan Temuan
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Cari Barang
          </Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Link href="/profile" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <span className="sr-only">Profile</span>
              <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  H
                </span>
              </span>
            </Button>
            <span className="font-medium text-sm">Hakem</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

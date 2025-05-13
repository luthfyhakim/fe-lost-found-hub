import { MapPin } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer className="border-t">
      <div className="w-full flex flex-col gap-2 py-6 px-4 md:flex-row md:items-center md:gap-4 md:px-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">Lost & Found Hub</span>
        </div>
        <p className="text-xs text-muted-foreground md:ml-auto">
          &copy; {new Date().getFullYear()} Lost & Found Hub. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

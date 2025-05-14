import { AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";

const matchAlerts = [
  {
    id: 1,
    lostItem: {
      id: 1,
      name: "Dompet Hitam",
      location: "Mall Grand Indonesia",
      date: "10 Mei 2023",
    },
    foundItem: {
      id: 1,
      name: "Dompet Coklat",
      location: "Plaza Indonesia",
      date: "10 Mei 2023",
    },
    matchPercentage: 85,
    status: "pending",
  },
  {
    id: 2,
    lostItem: {
      id: 3,
      name: "Laptop ASUS ROG",
      location: "Stasiun MRT Bundaran HI",
      date: "12 Mei 2023",
    },
    foundItem: {
      id: 5,
      name: "Laptop ASUS",
      location: "Stasiun MRT Dukuh Atas",
      date: "13 Mei 2023",
    },
    matchPercentage: 75,
    status: "pending",
  },
];

export default function MatchAlerts() {
  return (
    <div className="space-y-4">
      {matchAlerts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Tidak ada match alerts saat ini.
          </p>
        </div>
      ) : (
        matchAlerts.map((match) => (
          <div key={match.id} className="p-4 rounded-lg border ">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Potensi Kecocokan</h3>
                <Badge variant="outline">{match.matchPercentage}% Match</Badge>
              </div>
              <Link href={`/match/${match.id}`}>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Hilang</Badge>
                  <span className="font-medium">{match.lostItem.name}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  <p>{match.lostItem.location}</p>
                  <p>{match.lostItem.date}</p>
                </div>
              </div>

              <div className="p-3 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <Badge variant="success">Ditemukan</Badge>
                  <span className="font-medium">{match.lostItem.name}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  <p>{match.lostItem.location}</p>
                  <p>{match.lostItem.date}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button size="sm" className="cursor-pointer">
                Konfirmasi Match
              </Button>
              <Button size="sm" variant="outline" className="cursor-pointer">
                Tolak
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

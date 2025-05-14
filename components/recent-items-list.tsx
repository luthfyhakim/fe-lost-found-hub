import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

type RecentItemsListProps = {
  type: "all" | "lost" | "found";
};

type Items = {
  id: number;
  name: string;
  category: string;
  location: string;
  date: string;
  status: "open" | "closed";
  type?: RecentItemsListProps["type"];
};

const lostItems: Items[] = [
  {
    id: 1,
    name: "Dompet Hitam",
    category: "wallet",
    location: "Mall Grand Indonesia, Jakarta",
    date: "10 Mei 2023",
    status: "open",
  },
  {
    id: 2,
    name: "Kunci Mobil Toyota",
    category: "keys",
    location: "Taman Menteng, Jakarta",
    date: "11 Mei 2023",
    status: "open",
  },
  {
    id: 3,
    name: "Laptop ASUS ROG",
    category: "electronics",
    location: "Stasiun MRT Bundaran HI",
    date: "12 Mei 2023",
    status: "closed",
  },
];

const foundItems: Items[] = [
  {
    id: 1,
    name: "Dompet Coklat",
    category: "wallet",
    location: "Plaza Indonesia, Jakarta",
    date: "10 Mei 2023",
    status: "open",
  },
  {
    id: 2,
    name: "Kunci Motor Honda",
    category: "keys",
    location: "Halte Transjakarta Harmoni",
    date: "11 Mei 2023",
    status: "open",
  },
];

export default function RecentItemsList({ type }: RecentItemsListProps) {
  let items: Items[] = [];

  if (type === "all") {
    items = [
      ...lostItems.map((item) => ({ ...item, type: "lost" as const })),
      ...foundItems.map((item) => ({ ...item, type: "found" as const })),
    ];
  } else if (type === "lost") {
    items = lostItems.map((item) => ({ ...item, type: "lost" as const }));
  } else if (type === "found") {
    items = foundItems.map((item) => ({ ...item, type: "found" as const }));
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Tidak ada data yang ditemukan.
          </p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{item.name}</h3>
                <Badge
                  variant={item.type == "lost" ? "destructive" : "success"}
                >
                  {item.type === "lost" ? "Hilang" : "Ditemukan"}
                </Badge>
                {item.status === "closed" && (
                  <Badge
                    variant="outline"
                    className="border-sky-600 text-sky-600"
                  >
                    Selesai
                  </Badge>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            <Link
              href={`/item/${item.type}/${item.id}`}
              className="mt-2 md:mt-0 flex items-center text-sm text-primary hover:underline underline-offset-2"
            >
              Lihat Detail
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

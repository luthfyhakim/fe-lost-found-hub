import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight, User } from "lucide-react";

const searchResults = [
  {
    id: 1,
    type: "lost",
    name: "Dompet Hitam",
    category: "wallet",
    description: "Dompet kulit warna hitam berisi KTP, SIM, dan kartu ATM BCA",
    location: "Mall Grand Indonesia, Jakarta",
    date: "10 Mei 2023",
    status: "open",
    contact: "John Doe",
    reward: true,
  },
  {
    id: 2,
    type: "found",
    name: "Dompet Coklat",
    category: "wallet",
    description: "Dompet kulit warna coklat berisi KTP atas nama Ahmad",
    location: "Plaza Indonesia, Jakarta",
    date: "10 Mei 2023",
    status: "open",
    contact: "Jane Smith",
    reward: false,
  },
  {
    id: 3,
    type: "lost",
    name: "Kunci Mobil Toyota",
    category: "keys",
    description:
      "Kunci mobil Toyota Avanza dengan gantungan kunci berbentuk bola",
    location: "Taman Menteng, Jakarta",
    date: "11 Mei 2023",
    status: "open",
    contact: "Michael Johnson",
    reward: true,
  },
  {
    id: 4,
    type: "found",
    name: "Kunci Motor Honda",
    category: "keys",
    description: "Kunci motor Honda dengan gantungan kunci logo Honda",
    location: "Halte Transjakarta Harmoni",
    date: "11 Mei 2023",
    status: "open",
    contact: "Sarah Williams",
    reward: false,
  },
  {
    id: 5,
    type: "lost",
    name: "Laptop ASUS ROG",
    category: "electronics",
    description:
      "Laptop gaming ASUS ROG Strix warna hitam dengan stiker logo game",
    location: "Stasiun MRT Bundaran HI",
    date: "12 Mei 2023",
    status: "closed",
    contact: "David Brown",
    reward: true,
  },
];

export default function SearchResults() {
  return (
    <div className="space-y-4">
      {searchResults.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Tidak ada hasil yang ditemukan.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Menampilkan {searchResults.length} hasil
          </p>

          {searchResults.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex flex-col p-4 rounded-lg border"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge
                      variant={item.type === "lost" ? "destructive" : "success"}
                    >
                      {item.type === "lost" ? "Hilang" : "Ditemukan"}
                    </Badge>
                    {item.status === "closed" && (
                      <Badge variant="outline">Selesai</Badge>
                    )}
                    {item.reward && <Badge variant="secondary">Imbalan</Badge>}
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
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{item.contact}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/item/${item.type}/${item.id}`}
                  className="mt-2 md:mt-0 flex items-center text-sm text-primary hover:underline"
                >
                  Lihat Detail
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <p className="mt-2 text-sm">{item.description}</p>

              {item.type === "lost" && item.status === "open" && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    Saya Menemukan Barang Ini
                  </Button>
                </div>
              )}

              {item.type === "found" && item.status === "open" && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    Ini Barang Saya
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <Button variant="outline">Muat Lebih Banyak</Button>
          </div>
        </>
      )}
    </div>
  );
}

import DashboardFooter from "@/components/layouts/dashboard-footer";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

const matches = [
  {
    id: 1,
    lostItem: {
      id: 1,
      name: "Dompet Hitam",
      location: "Mall Grand Indonesia",
      date: "10 Mei 2023",
      description:
        "Dompet kulit warna hitam berisi KTP, SIM, dan kartu ATM BCA",
    },
    foundItem: {
      id: 1,
      name: "Dompet Coklat",
      location: "Plaza Indonesia",
      date: "10 Mei 2023",
      description: "Dompet kulit warna coklat berisi KTP atas nama Ahmad",
    },
    matchPercentage: 85,
    status: "pending",
    createdAt: "12 Mei 2023",
  },
  {
    id: 2,
    lostItem: {
      id: 3,
      name: "Laptop ASUS ROG",
      location: "Stasiun MRT Bundaran HI",
      date: "12 Mei 2023",
      description:
        "Laptop gaming ASUS ROG Strix warna hitam dengan stiker logo game",
    },
    foundItem: {
      id: 5,
      name: "Laptop ASUS",
      location: "Stasiun MRT Dukuh Atas",
      date: "13 Mei 2023",
      description: "Laptop ASUS warna hitam dalam tas laptop hitam",
    },
    matchPercentage: 75,
    status: "pending",
    createdAt: "14 Mei 2023",
  },
  {
    id: 3,
    lostItem: {
      id: 2,
      name: "Kunci Mobil Toyota",
      location: "Taman Menteng",
      date: "11 Mei 2023",
      description:
        "Kunci mobil Toyota Avanza dengan gantungan kunci berbentuk bola",
    },
    foundItem: {
      id: 2,
      name: "Kunci Mobil",
      location: "Halte Transjakarta Harmoni",
      date: "11 Mei 2023",
      description: "Kunci mobil dengan logo Toyota dan gantungan kunci bola",
    },
    matchPercentage: 90,
    status: "confirmed",
    createdAt: "12 Mei 2023",
  },
  {
    id: 4,
    lostItem: {
      id: 4,
      name: "iPhone 13 Pro",
      location: "Kafe Starbucks Sarinah",
      date: "15 Mei 2023",
      description: "iPhone 13 Pro warna biru dengan case transparan",
    },
    foundItem: {
      id: 6,
      name: "Handphone iPhone",
      location: "Kafe Starbucks Thamrin",
      date: "15 Mei 2023",
      description: "iPhone warna biru dengan case transparan, terkunci",
    },
    matchPercentage: 95,
    status: "rejected",
    createdAt: "16 Mei 2023",
  },
];

export default function MatchesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-6 px-4 md:px-6">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Match Alerts</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Potensi Kecocokan</CardTitle>
              <CardDescription>
                Berikut adalah daftar potensi kecocokan antara barang hilang dan
                barang temuan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="pending">Menunggu Konfirmasi</TabsTrigger>
                  <TabsTrigger value="confirmed">Terkonfirmasi</TabsTrigger>
                  <TabsTrigger value="rejected">Ditolak</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <h3 className="font-medium">
                              Potensi Kecocokan #{match.id}
                            </h3>
                            <Badge variant="outline">
                              {match.matchPercentage}% Match
                            </Badge>
                            {match.status === "pending" && (
                              <Badge variant="outline">
                                Menunggu Konfirmasi
                              </Badge>
                            )}
                            {match.status === "confirmed" && (
                              <Badge variant="success">Terkonfirmasi</Badge>
                            )}
                            {match.status === "rejected" && (
                              <Badge variant="destructive">Ditolak</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{match.createdAt}</span>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <Badge variant="destructive">Hilang</Badge>
                              <span className="font-medium">
                                {match.lostItem.name}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <p>{match.lostItem.location}</p>
                              <p>{match.lostItem.date}</p>
                              <p className="mt-1">
                                {match.lostItem.description}
                              </p>
                            </div>
                            <Link
                              href={`/item/lost/${match.lostItem.id}`}
                              className="text-xs text-primary hover:underline mt-2 inline-block"
                            >
                              Lihat Detail
                            </Link>
                          </div>

                          <div className="p-3 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              <Badge variant="success">Ditemukan</Badge>
                              <span className="font-medium">
                                {match.foundItem.name}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <p>{match.foundItem.location}</p>
                              <p>{match.foundItem.date}</p>
                              <p className="mt-1">
                                {match.foundItem.description}
                              </p>
                            </div>
                            <Link
                              href={`/item/found/${match.foundItem.id}`}
                              className="text-xs text-primary hover:underline mt-2 inline-block"
                            >
                              Lihat Detail
                            </Link>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <Link href={`/match/${match.id}`}>
                            <Button size="sm">Lihat Detail</Button>
                          </Link>
                          {match.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600"
                              >
                                Konfirmasi Match
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600"
                              >
                                Tolak
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="pending">
                  <div className="space-y-4">
                    {matches
                      .filter((match) => match.status === "pending")
                      .map((match) => (
                        <div key={match.id} className="p-4 rounded-lg border">
                          {/* Same content as above, filtered for pending status */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                              <h3 className="font-medium">
                                Potensi Kecocokan #{match.id}
                              </h3>
                              <Badge variant="outline">
                                {match.matchPercentage}% Match
                              </Badge>
                              <Badge variant="outline">
                                Menunggu Konfirmasi
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{match.createdAt}</span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="destructive">Hilang</Badge>
                                <span className="font-medium">
                                  {match.lostItem.name}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <p>{match.lostItem.location}</p>
                                <p>{match.lostItem.date}</p>
                                <p className="mt-1">
                                  {match.lostItem.description}
                                </p>
                              </div>
                              <Link
                                href={`/item/lost/${match.lostItem.id}`}
                                className="text-xs text-primary hover:underline mt-2 inline-block"
                              >
                                Lihat Detail
                              </Link>
                            </div>

                            <div className="p-3 rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="success">Ditemukan</Badge>
                                <span className="font-medium">
                                  {match.foundItem.name}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <p>{match.foundItem.location}</p>
                                <p>{match.foundItem.date}</p>
                                <p className="mt-1">
                                  {match.foundItem.description}
                                </p>
                              </div>
                              <Link
                                href={`/item/found/${match.foundItem.id}`}
                                className="text-xs text-primary hover:underline mt-2 inline-block"
                              >
                                Lihat Detail
                              </Link>
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2">
                            <Link href={`/match/${match.id}`}>
                              <Button size="sm">Lihat Detail</Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600"
                            >
                              Konfirmasi Match
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                            >
                              Tolak
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="confirmed">
                  <div className="space-y-4">
                    {matches
                      .filter((match) => match.status === "confirmed")
                      .map((match) => (
                        <div key={match.id} className="p-4 rounded-lg border">
                          {/* Similar content, filtered for confirmed status */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-green-500" />
                              <h3 className="font-medium">
                                Potensi Kecocokan #{match.id}
                              </h3>
                              <Badge variant="outline">
                                {match.matchPercentage}% Match
                              </Badge>
                              <Badge variant="success">Terkonfirmasi</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{match.createdAt}</span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="destructive">Hilang</Badge>
                                <span className="font-medium">
                                  {match.lostItem.name}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <p>{match.lostItem.location}</p>
                                <p>{match.lostItem.date}</p>
                                <p className="mt-1">
                                  {match.lostItem.description}
                                </p>
                              </div>
                              <Link
                                href={`/item/lost/${match.lostItem.id}`}
                                className="text-xs text-primary hover:underline mt-2 inline-block"
                              >
                                Lihat Detail
                              </Link>
                            </div>

                            <div className="p-3 rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="success">Ditemukan</Badge>
                                <span className="font-medium">
                                  {match.foundItem.name}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <p>{match.foundItem.location}</p>
                                <p>{match.foundItem.date}</p>
                                <p className="mt-1">
                                  {match.foundItem.description}
                                </p>
                              </div>
                              <Link
                                href={`/item/found/${match.foundItem.id}`}
                                className="text-xs text-primary hover:underline mt-2 inline-block"
                              >
                                Lihat Detail
                              </Link>
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2">
                            <Link href={`/match/${match.id}`}>
                              <Button size="sm">Lihat Detail</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="rejected">
                  <div className="space-y-4">
                    {matches
                      .filter((match) => match.status === "rejected")
                      .map((match) => (
                        <div key={match.id} className="p-4 rounded-lg border">
                          {/* Similar content, filtered for rejected status */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-red-500" />
                              <h3 className="font-medium">
                                Potensi Kecocokan #{match.id}
                              </h3>
                              <Badge variant="outline">
                                {match.matchPercentage}% Match
                              </Badge>
                              <Badge variant="destructive">Ditolak</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{match.createdAt}</span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="destructive">Hilang</Badge>
                                <span className="font-medium">
                                  {match.lostItem.name}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <p>{match.lostItem.location}</p>
                                <p>{match.lostItem.date}</p>
                                <p className="mt-1">
                                  {match.lostItem.description}
                                </p>
                              </div>
                              <Link
                                href={`/item/lost/${match.lostItem.id}`}
                                className="text-xs text-primary hover:underline mt-2 inline-block"
                              >
                                Lihat Detail
                              </Link>
                            </div>

                            <div className="p-3 rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="success">Ditemukan</Badge>
                                <span className="font-medium">
                                  {match.foundItem.name}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <p>{match.foundItem.location}</p>
                                <p>{match.foundItem.date}</p>
                                <p className="mt-1">
                                  {match.foundItem.description}
                                </p>
                              </div>
                              <Link
                                href={`/item/found/${match.foundItem.id}`}
                                className="text-xs text-primary hover:underline mt-2 inline-block"
                              >
                                Lihat Detail
                              </Link>
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2">
                            <Link href={`/match/${match.id}`}>
                              <Button size="sm">Lihat Detail</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

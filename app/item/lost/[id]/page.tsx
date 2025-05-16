"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Share2,
  CircleDollarSign,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ItemLocationMap from "@/components/item-location-map";
import DashboardFooter from "@/components/layouts/dashboard-footer";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import BarangHilang from "../../../../public/barang-hilang.png";

const lostItems = [
  {
    id: "1",
    name: "Dompet Hitam",
    category: "wallet",
    location: "Mall Grand Indonesia, Jakarta",
    coordinates: { lat: -6.1954, lng: 106.8217 },
    date: "10 Mei 2023",
    time: "14:30",
    description:
      "Dompet kulit warna hitam berisi KTP, SIM, dan kartu ATM BCA. Terakhir kali saya ingat masih di saku ketika berada di food court lantai 5. Kemungkinan terjatuh di area food court atau di toilet.",
    contact: {
      name: "John Doe",
      phone: "081234567890",
      email: "john@example.com",
    },
    reward: true,
    rewardAmount: "Rp 200.000",
    status: "open",
    createdAt: "10 Mei 2023, 15:45",
    image: BarangHilang,
  },
  {
    id: "2",
    name: "Kunci Mobil Toyota",
    category: "keys",
    location: "Taman Menteng, Jakarta",
    coordinates: { lat: -6.1956, lng: 106.8306 },
    date: "11 Mei 2023",
    time: "17:00",
    description:
      "Kunci mobil Toyota Avanza dengan gantungan kunci berbentuk bola. Hilang saat jogging di area taman sekitar pukul 5 sore.",
    contact: {
      name: "Michael Johnson",
      phone: "081234567892",
      email: "michael@example.com",
    },
    reward: true,
    rewardAmount: "Rp 100.000",
    status: "open",
    createdAt: "11 Mei 2023, 18:20",
    image: BarangHilang,
  },
];

export default function LostItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const item = lostItems.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Barang tidak ditemukan</h1>
        <p className="text-muted-foreground">
          Barang dengan ID {id} tidak ditemukan.
        </p>
        <Link href="/dashboard" className="mt-4">
          <Button className="cursor-pointer">Kembali ke Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleReportFound = () => {
    router.push(`/report/found?related=${id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Barang Hilang: ${item.name}`,
        text: `Bantu temukan ${item.name} yang hilang di ${item.location} pada ${item.date}`,
        url: window.location.href,
      });
    } else {
      alert(`Link copied to clipboard: ${window.location.href}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-6 px-4 md:px-6">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Detail Barang Hilang
              </h1>
              <p className="text-muted-foreground">
                Dilaporkan pada {item.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <Badge variant="destructive">Hilang</Badge>
              {item.status === "open" && <Badge variant="outline">Aktif</Badge>}
              {item.status === "closed" && (
                <Badge variant="outline">Selesai</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleShare}
                className="cursor-pointer"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button
                size="sm"
                onClick={handleReportFound}
                className="cursor-pointer"
              >
                Saya Menemukan Barang Ini
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Barang</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video relative rounded-md overflow-hidden border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Kategori</p>
                      <p className="text-sm">
                        {item.category === "wallet"
                          ? "Dompet/Tas"
                          : item.category === "keys"
                          ? "Kunci"
                          : item.category === "electronics"
                          ? "Elektronik"
                          : item.category === "documents"
                          ? "Dokumen"
                          : item.category === "jewelry"
                          ? "Perhiasan"
                          : item.category === "clothing"
                          ? "Pakaian"
                          : "Lainnya"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Status</p>
                      {item.status === "open" ? (
                        <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-400">
                          Masih Dicari
                        </Badge>
                      ) : item.status === "closed" ? (
                        <Badge className="bg-green-500 text-white hover:bg-green-600 border-green-500">
                          Telah Ditemukan
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-400 text-white hover:bg-gray-500 border-gray-400">
                          Status Tidak Diketahui
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tanggal Kehilangan</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Waktu Kehilangan</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-sm font-medium">Lokasi Kehilangan</p>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Deskripsi</p>
                    <p className="text-sm">{item.description}</p>
                  </div>

                  {item.reward && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Imbalan</p>
                        <div className="flex items-center gap-2 text-sm">
                          <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                          <span>{item.rewardAmount}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lokasi Kehilangan</CardTitle>
                  <CardDescription>
                    Lokasi terakhir barang sebelum hilang
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] rounded-md overflow-hidden">
                    <ItemLocationMap
                      location={{
                        name: item.name,
                        address: item.location,
                        coordinates: item.coordinates,
                      }}
                      type="lost"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                  <CardDescription>
                    Hubungi pelapor jika Anda menemukan barang ini
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{item.contact.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{item.contact.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{item.contact.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Apakah Anda menemukan barang ini?
                    </p>
                    <Button
                      className="w-full cursor-pointer"
                      onClick={handleReportFound}
                    >
                      Laporkan Barang Temuan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bagikan</CardTitle>
                  <CardDescription>
                    Bantu sebarkan informasi barang hilang ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Bagikan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

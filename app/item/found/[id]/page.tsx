"use client";

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
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Share2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BarangHilang from "../../../../public/barang-hilang.png";
import { Separator } from "@/components/ui/separator";
import ItemLocationMap from "@/components/item-location-map";

const foundItems = [
  {
    id: "1",
    name: "Dompet Coklat",
    category: "wallet",
    location: "Plaza Indonesia, Jakarta",
    coordinates: { lat: -6.193, lng: 106.8236 },
    date: "10 Mei 2023",
    time: "16:45",
    description:
      "Dompet kulit warna coklat berisi KTP atas nama Ahmad. Ditemukan di area toilet pria lantai 2 Plaza Indonesia.",
    contact: {
      name: "Jane Smith",
      phone: "081234567891",
      email: "jane@example.com",
    },
    keepItem: true,
    dropLocation: "",
    status: "open",
    createdAt: "10 Mei 2023, 17:30",
    image: BarangHilang,
  },
  {
    id: "2",
    name: "Kunci Motor Honda",
    category: "keys",
    location: "Halte Transjakarta Harmoni",
    coordinates: { lat: -6.1677, lng: 106.8206 },
    date: "11 Mei 2023",
    time: "08:30",
    description:
      "Kunci motor Honda dengan gantungan kunci logo Honda. Ditemukan di kursi halte Transjakarta Harmoni arah Blok M.",
    contact: {
      name: "Sarah Williams",
      phone: "081234567893",
      email: "sarah@example.com",
    },
    keepItem: false,
    dropLocation: "Diserahkan ke petugas Transjakarta di Halte Harmoni",
    status: "open",
    createdAt: "11 Mei 2023, 09:15",
    image: BarangHilang,
  },
];

export default function FoundItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const item = foundItems.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen items-center">
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

  const handleClaimItem = () => {
    router.push(`/report/lost?related=${id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Barang Temuan: ${item.name}`,
        text: `Apakah Anda kehilangan ${item.name} di ${item.location} pada ${item.date}?`,
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
                Detail Barang Temuan
              </h1>
              <p className="text-muted-foreground">
                Dilaporkan pada {item.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <Badge variant="success">Ditemukan</Badge>
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
                onClick={handleClaimItem}
                className="cursor-pointer"
              >
                Ini Barang Saya
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
                      <p className="text-sm">
                        {item.status === "open"
                          ? "Menunggu Pemilik"
                          : "Telah Diklaim"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tanggal Penemuan</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Waktu Penemuan</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-sm font-medium">Lokasi Penemuan</p>
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

                  {!item.keepItem && item.dropLocation && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Lokasi Penyerahan Barang
                        </p>
                        <p className="text-sm">{item.dropLocation}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lokasi Penemuan</CardTitle>
                  <CardDescription>
                    Lokasi di mana barang ditemukan
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
                      type="found"
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
                    Hubungi penemu jika ini adalah barang Anda
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
                    <p className="text-sm font-medium">Status Barang</p>
                    <p className="text-sm">
                      {item.keepItem
                        ? "Barang disimpan oleh penemu"
                        : "Barang telah diserahkan ke pihak ketiga"}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Apakah ini barang Anda?
                    </p>
                    <Button
                      className="w-full cursor-pointer"
                      onClick={handleClaimItem}
                    >
                      Klaim Barang Ini
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bagikan</CardTitle>
                  <CardDescription>
                    Bantu sebarkan informasi barang temuan ini
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

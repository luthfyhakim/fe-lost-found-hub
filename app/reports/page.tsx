"use client";

import { DateRangePicker } from "@/components/date-picker";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

const lostItems = [
  {
    id: 1,
    name: "Dompet Hitam",
    category: "wallet",
    location: "Mall Grand Indonesia, Jakarta",
    date: "10 Mei 2023",
    time: "14:30",
    description: "Dompet kulit warna hitam berisi KTP, SIM, dan kartu ATM BCA",
    status: "open",
    createdAt: "10 Mei 2023, 15:45",
    reward: true,
  },
  {
    id: 2,
    name: "Kunci Mobil Toyota",
    category: "keys",
    location: "Taman Menteng, Jakarta",
    date: "11 Mei 2023",
    time: "17:00",
    description:
      "Kunci mobil Toyota Avanza dengan gantungan kunci berbentuk bola",
    status: "open",
    createdAt: "11 Mei 2023, 18:20",
    reward: true,
  },
  {
    id: 3,
    name: "Laptop ASUS ROG",
    category: "electronics",
    location: "Stasiun MRT Bundaran HI",
    date: "12 Mei 2023",
    time: "18:15",
    description:
      "Laptop gaming ASUS ROG Strix warna hitam dengan stiker logo game",
    status: "closed",
    createdAt: "12 Mei 2023, 19:30",
    reward: true,
  },
  {
    id: 4,
    name: "iPhone 13 Pro",
    category: "electronics",
    location: "Kafe Starbucks Sarinah",
    date: "15 Mei 2023",
    time: "10:20",
    description: "iPhone 13 Pro warna biru dengan case transparan",
    status: "open",
    createdAt: "15 Mei 2023, 11:05",
    reward: false,
  },
  {
    id: 5,
    name: "Tas Ransel Hitam",
    category: "wallet",
    location: "Bus Transjakarta Koridor 1",
    date: "16 Mei 2023",
    time: "08:45",
    description: "Tas ransel hitam merk Eiger berisi laptop dan buku",
    status: "open",
    createdAt: "16 Mei 2023, 09:30",
    reward: true,
  },
];

const foundItems = [
  {
    id: 1,
    name: "Dompet Coklat",
    category: "wallet",
    location: "Plaza Indonesia, Jakarta",
    date: "10 Mei 2023",
    time: "16:45",
    description: "Dompet kulit warna coklat berisi KTP atas nama Ahmad",
    status: "open",
    createdAt: "10 Mei 2023, 17:30",
  },
  {
    id: 2,
    name: "Kunci Motor Honda",
    category: "keys",
    location: "Halte Transjakarta Harmoni",
    date: "11 Mei 2023",
    time: "08:30",
    description: "Kunci motor Honda dengan gantungan kunci logo Honda",
    status: "open",
    createdAt: "11 Mei 2023, 09:15",
  },
  {
    id: 3,
    name: "Handphone Samsung",
    category: "electronics",
    location: "Taman Suropati",
    date: "13 Mei 2023",
    time: "15:20",
    description: "Samsung Galaxy S21 warna hitam dengan casing bergambar bunga",
    status: "closed",
    createdAt: "13 Mei 2023, 16:00",
  },
  {
    id: 4,
    name: "Kacamata Hitam",
    category: "other",
    location: "Bioskop CGV Grand Indonesia",
    date: "14 Mei 2023",
    time: "21:30",
    description: "Kacamata hitam merk Ray-Ban dalam case hitam",
    status: "open",
    createdAt: "14 Mei 2023, 22:15",
  },
];

export default function ReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("type") || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const itemsPerPage = 5;

  let items = [];

  if (activeTab === "all") {
    items = [
      ...lostItems.map((item) => ({ ...item, type: "lost" })),
      ...foundItems.map((item) => ({ ...item, type: "found" })),
    ];
  } else if (activeTab === "lost") {
    items = lostItems.map((item) => ({ ...item, type: "lost" }));
  } else {
    items = foundItems.map((item) => ({ ...item, type: "found" }));
  }

  if (searchQuery) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (category !== "all") {
    items = items.filter((item) => item.category === category);
  }

  if (status !== "all") {
    items = items.filter((item) => item.status === status);
  }

  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    router.push(`/reports?type=${value}`);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedItems.map((item) => item.id));
    }
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range || { from: undefined });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-10 px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Laporan Barang
              </h1>
              <p className="text-muted-foreground">
                Kelola semua laporan barang hilang dan temuan
              </p>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pencarian dan Filter</CardTitle>
              <CardDescription>
                Cari dan filter laporan berdasarkan kriteria tertentu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cari berdasarkan nama, deskripsi, atau lokasi"
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      <SelectItem value="electronics">Elektronik</SelectItem>
                      <SelectItem value="wallet">Dompet/Tas</SelectItem>
                      <SelectItem value="documents">Dokumen</SelectItem>
                      <SelectItem value="keys">Kunci</SelectItem>
                      <SelectItem value="jewelry">Perhiasan</SelectItem>
                      <SelectItem value="clothing">Pakaian</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="cursor-pointer">
                    Cari
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1 cursor-pointer"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    Filter Lanjutan
                  </Button>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="open">Aktif</SelectItem>
                      <SelectItem value="closed">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isFilterOpen && (
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium mb-2 block">
                        Rentang Tanggal
                      </label>
                      <DateRangePicker
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        placeholder="Pilih rentang tanggal"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium mb-2 block">
                        Filter Tambahan
                      </label>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="reward" className="cursor-pointer" />
                          <Label
                            htmlFor="reward"
                            className="font-normal text-primary"
                          >
                            Dengan Imbalan
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="with-image"
                            className="cursor-pointer"
                          />
                          <Label
                            htmlFor="with-image"
                            className="font-normal text-primary"
                          >
                            Dengan Foto
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  Daftar Laporan
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {items.length} laporan ditemukan
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all" className="cursor-pointer">
                    Semua
                  </TabsTrigger>
                  <TabsTrigger value="lost" className="cursor-pointer">
                    Barang Hilang
                  </TabsTrigger>
                  <TabsTrigger value="found" className="cursor-pointer">
                    Barang Temuan
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab}>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={
                                    selectedItems.length > 0 &&
                                    selectedItems.length ===
                                      paginatedItems.length
                                  }
                                  onCheckedChange={handleSelectAll}
                                  className="cursor-pointer"
                                />
                                <span>Nama Barang</span>
                              </div>
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Kategori
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Lokasi
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Tanggal
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Status
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {paginatedItems.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="p-4 text-center text-muted-foreground"
                              >
                                Tidak ada data yang ditemukan.
                              </td>
                            </tr>
                          ) : (
                            paginatedItems.map((item) => (
                              <tr
                                key={`${item.type}-${item.id}`}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={selectedItems.includes(item.id)}
                                      onCheckedChange={() =>
                                        handleSelectItem(item.id)
                                      }
                                      className="cursor-pointer"
                                    />
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={
                                          item.type === "lost"
                                            ? "destructive"
                                            : "success"
                                        }
                                        className="w-16 justify-center"
                                      >
                                        {item.type === "lost"
                                          ? "Hilang"
                                          : "Temuan"}
                                      </Badge>
                                      <Link
                                        href={`/item/${item.type}/${item.id}`}
                                        className="text-primary"
                                      >
                                        {item.name}
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 align-middle">
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
                                </td>
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                    <span className="truncate max-w-[200px]">
                                      {item.location}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4 align-middle">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3 text-muted-foreground" />
                                      <span>{item.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3 text-muted-foreground" />
                                      <span>{item.time}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge
                                    variant={
                                      item.status === "open"
                                        ? "outline"
                                        : "secondary"
                                    }
                                  >
                                    {item.status === "open"
                                      ? "Aktif"
                                      : "Selesai"}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                  <Link
                                    href={`/item/${item.type}/${item.id}`}
                                    className="text-primary hover:underline"
                                  >
                                    Detail
                                  </Link>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                        {Math.min(currentPage * itemsPerPage, items.length)}{" "}
                        dari {items.length} laporan
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="icon"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedItems.length > 0 && (
                    <div className="flex items-center justify-between mt-4 p-2 bg-muted rounded-md">
                      <div className="text-sm">
                        {selectedItems.length} item
                        {selectedItems.length > 1 ? "s" : ""} dipilih
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Tandai Selesai
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  )}
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

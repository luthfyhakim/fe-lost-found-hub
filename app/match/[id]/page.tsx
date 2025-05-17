"use client";

import DashboardFooter from "@/components/layouts/dashboard-footer";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import MatchMap from "@/components/match-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const matchesData = [
  {
    id: "1",
    lostItem: {
      id: 1,
      name: "Dompet Hitam",
      category: "wallet",
      location: "Mall Grand Indonesia",
      coordinates: { lat: -6.1954, lng: 106.8217 },
      date: "10 Mei 2023",
      time: "14:30",
      description:
        "Dompet kulit warna hitam berisi KTP, SIM, dan kartu ATM BCA",
      contact: {
        name: "John Doe",
        phone: "081234567890",
        email: "john@example.com",
      },
      reward: true,
      rewardAmount: "Rp 200.000",
      status: "open",
    },
    foundItem: {
      id: 1,
      name: "Dompet Coklat",
      category: "wallet",
      location: "Plaza Indonesia",
      coordinates: { lat: -6.193, lng: 106.8236 },
      date: "10 Mei 2023",
      time: "16:45",
      description: "Dompet kulit warna coklat berisi KTP atas nama Ahmad",
      contact: {
        name: "Jane Smith",
        phone: "081234567891",
        email: "jane@example.com",
      },
      keepItem: true,
      status: "open",
    },
    matchPercentage: 85,
    matchDetails: [
      {
        factor: "Lokasi",
        score: 90,
        description: "Lokasi penemuan berjarak 500m dari lokasi kehilangan",
      },
      {
        factor: "Waktu",
        score: 85,
        description: "Ditemukan 2 jam setelah dilaporkan hilang",
      },
      {
        factor: "Kategori",
        score: 100,
        description: "Kategori barang sama: Dompet",
      },
      {
        factor: "Deskripsi",
        score: 70,
        description: "Beberapa kesamaan dalam deskripsi barang",
      },
    ],
    status: "pending",
    createdAt: "12 Mei 2023",
    messages: [
      {
        id: 1,
        sender: "system",
        content: "Match alert dibuat pada 12 Mei 2023",
        timestamp: "12 Mei 2023, 10:30",
      },
    ],
  },
  {
    id: "2",
    lostItem: {
      id: 3,
      name: "Laptop ASUS ROG",
      category: "electronics",
      location: "Stasiun MRT Bundaran HI",
      coordinates: { lat: -6.1928, lng: 106.823 },
      date: "12 Mei 2023",
      time: "18:15",
      description:
        "Laptop gaming ASUS ROG Strix warna hitam dengan stiker logo game",
      contact: {
        name: "David Brown",
        phone: "081234567892",
        email: "david@example.com",
      },
      reward: true,
      rewardAmount: "Rp 1.000.000",
      status: "open",
    },
    foundItem: {
      id: 5,
      name: "Laptop ASUS",
      category: "electronics",
      location: "Stasiun MRT Dukuh Atas",
      coordinates: { lat: -6.2008, lng: 106.8222 },
      date: "13 Mei 2023",
      time: "09:20",
      description: "Laptop ASUS warna hitam dalam tas laptop hitam",
      contact: {
        name: "Michael Johnson",
        phone: "081234567893",
        email: "michael@example.com",
      },
      keepItem: true,
      status: "open",
    },
    matchPercentage: 75,
    matchDetails: [
      {
        factor: "Lokasi",
        score: 80,
        description: "Lokasi penemuan berjarak 1km dari lokasi kehilangan",
      },
      {
        factor: "Waktu",
        score: 70,
        description: "Ditemukan 15 jam setelah dilaporkan hilang",
      },
      {
        factor: "Kategori",
        score: 100,
        description: "Kategori barang sama: Elektronik",
      },
      {
        factor: "Deskripsi",
        score: 65,
        description: "Beberapa kesamaan dalam deskripsi barang",
      },
    ],
    status: "pending",
    createdAt: "14 Mei 2023",
    messages: [
      {
        id: 1,
        sender: "system",
        content: "Match alert dibuat pada 14 Mei 2023",
        timestamp: "14 Mei 2023, 11:45",
      },
    ],
  },
];

export default function MatchDetailPage() {
  const params = useParams();
  const { id } = params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("");

  const match = matchesData.find((m) => m.id === id);

  if (!match) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Match tidak ditemukan</h1>
        <p className="text-muted-foreground">
          Match dengan ID {id} tidak ditemukan.
        </p>
        <Link href="/matches" className="mt-4">
          <Button>Kembali ke Daftar Match</Button>
        </Link>
      </div>
    );
  }

  if (!status && match.status) {
    setStatus(match.status);
  }

  if (messages.length === 0 && match.messages) {
    setMessages(match.messages);
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      content: message,
      timestamp: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleConfirmMatch = () => {
    setStatus("confirmed");

    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      content: "Match telah dikonfirmasi",
      timestamp: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, systemMessage]);
  };

  const handleRejectMatch = () => {
    setStatus("rejected");

    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      content: "Match telah ditolak",
      timestamp: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, systemMessage]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-6 px-4 md:px-6">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/matches">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Detail Match #{id}
              </h1>
              <p className="text-muted-foreground">
                Dibuat pada {match.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle
                className={`h-5 w-5 ${
                  status === "confirmed"
                    ? "text-green-500"
                    : status === "rejected"
                    ? "text-red-500"
                    : "text-amber-500"
                }`}
              />
              <h2 className="text-lg font-semibold">Potensi Kecocokan</h2>
              <Badge variant="outline">{match.matchPercentage}% Match</Badge>
              {status === "pending" && (
                <Badge variant="outline">Menunggu Konfirmasi</Badge>
              )}
              {status === "confirmed" && (
                <Badge variant="success">Terkonfirmasi</Badge>
              )}
              {status === "rejected" && (
                <Badge variant="destructive">Ditolak</Badge>
              )}
            </div>
            {status === "pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-600"
                  onClick={handleConfirmMatch}
                >
                  Konfirmasi Match
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600"
                  onClick={handleRejectMatch}
                >
                  Tolak
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive">Barang Hilang</Badge>
                  <Link href={`/item/lost/${match.lostItem.id}`}>
                    <Button variant="ghost" size="sm">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
                <CardTitle className="text-xl">{match.lostItem.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{match.lostItem.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {match.lostItem.date}, {match.lostItem.time}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{match.lostItem.description}</p>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Informasi Kontak</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{match.lostItem.contact.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{match.lostItem.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{match.lostItem.contact.email}</span>
                    </div>
                  </div>
                </div>
                {match.lostItem.reward && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Imbalan</h4>
                      <p className="text-sm">{match.lostItem.rewardAmount}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="success">Barang Temuan</Badge>
                  <Link href={`/item/found/${match.foundItem.id}`}>
                    <Button variant="ghost" size="sm">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
                <CardTitle className="text-xl">
                  {match.foundItem.name}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{match.foundItem.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {match.foundItem.date}, {match.foundItem.time}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{match.foundItem.description}</p>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Informasi Kontak</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{match.foundItem.contact.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{match.foundItem.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{match.foundItem.contact.email}</span>
                    </div>
                  </div>
                </div>
                {match.foundItem.keepItem && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Status Barang</h4>
                      <p className="text-sm">Barang disimpan oleh penemu</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lokasi Barang</CardTitle>
              <CardDescription>
                Visualisasi lokasi barang hilang dan barang temuan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] rounded-md overflow-hidden">
                <MatchMap
                  lostItem={{
                    name: match.lostItem.name,
                    location: match.lostItem.location,
                    coordinates: match.lostItem.coordinates,
                  }}
                  foundItem={{
                    name: match.foundItem.name,
                    location: match.foundItem.location,
                    coordinates: match.foundItem.coordinates,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detail Kecocokan</CardTitle>
              <CardDescription>
                Faktor-faktor yang menentukan kecocokan barang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {match.matchDetails.map((detail, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{detail.factor}</h4>
                      <Badge variant="outline">{detail.score}%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${detail.score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Komunikasi</CardTitle>
              <CardDescription>
                Komunikasi antara pelapor barang hilang dan penemu barang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="messages">
                <TabsList className="mb-4">
                  <TabsTrigger value="messages">Pesan</TabsTrigger>
                  <TabsTrigger value="history">Riwayat</TabsTrigger>
                </TabsList>
                <TabsContent value="messages">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 h-[300px] overflow-y-auto space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === "system"
                              ? "items-center"
                              : msg.sender === "user"
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          <div
                            className={`px-3 py-2 rounded-lg max-w-[80%] ${
                              msg.sender === "system"
                                ? "bg-muted text-muted-foreground text-xs"
                                : msg.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {msg.content}
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {msg.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Ketik pesan..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>Kirim</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="w-24 justify-center"
                          >
                            {match.createdAt}
                          </Badge>
                          <span>Match alert dibuat</span>
                        </li>
                        {status === "confirmed" && (
                          <li className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="w-24 justify-center"
                            >
                              Hari ini
                            </Badge>
                            <span>Match dikonfirmasi</span>
                          </li>
                        )}
                        {status === "rejected" && (
                          <li className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="w-24 justify-center"
                            >
                              Hari ini
                            </Badge>
                            <span>Match ditolak</span>
                          </li>
                        )}
                      </ul>
                    </div>
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

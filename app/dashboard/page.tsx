import DashboardMap from "@/components/dashboard-map";
import DashboardFooter from "@/components/layouts/dashboard-footer";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import MatchAlerts from "@/components/match-alerts";
import RecentItemsList from "@/components/recent-items-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-10 px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Kelola laporan barang hilang dan temuan Anda.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/report/lost">
                <Button className="cursor-pointer">
                  Laporkan Barang Hilang
                </Button>
              </Link>
              <Link href="/report/found">
                <Button variant="outline" className="cursor-pointer">
                  Laporkan Barang Temuan
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  Total Laporan
                </CardTitle>
                <FileText className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  7 barang hilang, 5 barang temuan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  Match Ditemukan
                </CardTitle>
                <FileText className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Barang yang berhasil dicocokkan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  Menunggu Konfirmasi
                </CardTitle>
                <FileText className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Laporan yang perlu dikonfirmasi
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Peta Interaktif</CardTitle>
                <CardDescription>
                  Visualisasi lokasi barang hilang dan temuan
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="h-[400px] rounded-md overflow-hidden">
                  <DashboardMap />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="text-sm text-muted-foreground">
                    Barang Hilang
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-blue-500"></span>
                  <span className="text-sm text-muted-foreground">
                    Barang Temuan
                  </span>
                </div>
              </CardFooter>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Match Alerts</CardTitle>
                <CardDescription>
                  Potensi kecocokan barang hilang dan temuan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MatchAlerts />
              </CardContent>
              <CardFooter>
                <Link
                  href="/matches"
                  className="text-sm text-primary hover:underline underline-offset-2"
                >
                  Lihat semua match
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Laporan Terbaru</CardTitle>
              <CardDescription>
                Daftar laporan barang hilang dan temuan terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
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
                <TabsContent value="all">
                  <RecentItemsList type="all" />
                </TabsContent>
                <TabsContent value="lost">
                  <RecentItemsList type="lost" />
                </TabsContent>
                <TabsContent value="found">
                  <RecentItemsList type="found" />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Link
                href="/reports"
                className="text-sm text-primary hover:underline underline-offset-2"
              >
                Lihat semua laporan
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

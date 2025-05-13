import { Button } from "@/components/ui/button";
import { Bell, FileText, Globe, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section1 from "../public/section-1.jpg";
import About from "../public/about.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Lost & Found Hub</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Fitur
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Cara Kerja
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Tentang Kami
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button className="cursor-pointer">Masuk</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="cursor-pointer">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-5">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Temukan Barang Anda yang Hilang
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Platform berbasis GIS untuk melaporkan dan mencari barang
                    yang hilang di tempat umum dengan mudah dan cepat.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/report/lost">
                    <Button size="lg" className="cursor-pointer gap-1">
                      Laporkan Barang Hilang
                    </Button>
                  </Link>
                  <Link href="/report/found">
                    <Button
                      size="lg"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Laporkan Barang Temuan
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={Section1}
                  width={400}
                  height={400}
                  alt="Lost and Found Illustration"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-muted"
        >
          <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Fitur Utama
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Lost & Found Hub menyediakan berbagai fitur untuk membantu
                  Anda menemukan barang yang hilang.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Form Laporan</h3>
                  <p className="text-muted-foreground">
                    Laporkan barang hilang atau temuan dengan mudah melalui form
                    yang lengkap.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Pencarian Barang</h3>
                  <p className="text-muted-foreground">
                    Cari barang hilang berdasarkan kategori, lokasi, dan waktu
                    kehilangan.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Peta Interaktif</h3>
                  <p className="text-muted-foreground">
                    Visualisasi lokasi barang hilang dan temuan pada peta
                    interaktif.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Bell className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Match Alert</h3>
                  <p className="text-muted-foreground">
                    Sistem otomatis mencocokan barang hilang dengan barang
                    temuan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 xl:py-40"
        >
          <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Cara Kerja
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bagaimana Lost & Found Hub membantu Anda menemukan barang yang
                  hilang.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Laporkan</h3>
                  <p className="text-muted-foreground">
                    Laporkan barang hilang atau temuan dengan detail lengkap dan
                    lokasi pada peta.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Match Alert</h3>
                  <p className="text-muted-foreground">
                    Sistem kami secara otomatis mencocokan laporan barang hilang
                    dengan barang temuan.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Terhubung</h3>
                  <p className="text-muted-foreground">
                    Dapatkan notifikasi ketika barang Anda ditemukan dan
                    terhubung dengan penemu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-muted"
        >
          <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Tentang Lost & Found Hub
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Lost & FOund Hub adalah platform berbasis website yang
                    dirancang untuk memudahkan pengguna dalam melaporkan dan
                    mencari barang yang hilang di tempat umum.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Kami menggunakan teknologi Geographic Information System (GIS)
                  untuk memvisualisasikan lokasi barang hilang dan temuan. Serta
                  sistem Match Alert yang canggih untuk mencocokan barang hilang
                  dengan barang temuan secara otomatis.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={About}
                  width={600}
                  height={400}
                  alt="About Lost and Found Hub"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="w-full grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:px-8 xl:px-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Mulai Sekarang
              </h2>
              <p className="mx-auto max-w[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Laporkan barang hilang atau temuan dan bantu orang lain
                menemukan barang mereka.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link href="/report/lost">
                <Button size="lg" className="gap-1 cursor-pointer">
                  Laporkan Barang Hilang
                </Button>
              </Link>
              <Link href="/report/found">
                <Button size="lg" variant="outline" className="cursor-pointer">
                  Laporkan Barang Temuan
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

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
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Syarat & Ketentuan
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { DateRangePicker } from "@/components/date-picker";
import DashboardFooter from "@/components/layouts/dashboard-footer";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import SearchMap from "@/components/search-map";
import SearchResults from "@/components/search-results";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, MapPin, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [radius, setRadius] = useState([5]);
  const [view, setView] = useState<"list" | "map">("list");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      dateRange: undefined,
      reportType: "all",
      status: "all",
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", {
      searchQuery,
      category,
      dateRange: form.getValues("dateRange"),
      radius,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-10 px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Cari Barang</h1>
            <p className="text-muted-foreground">
              Temukan barang hilang atau barang temuan di sekitar Anda.
            </p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pencarian</CardTitle>
              <CardDescription>
                Masukkan kata kunci atau filter untuk mencari barang.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Cari barang (dompet, kunci, tas, dll)"
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
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={view === "list" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setView("list")}
                        className="cursor-pointer"
                      >
                        Daftar
                      </Button>
                      <Button
                        type="button"
                        variant={view === "map" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setView("map")}
                        className="cursor-pointer"
                      >
                        Peta
                      </Button>
                    </div>
                  </div>

                  {isFilterOpen && (
                    <div className="grid gap-4 pt-2 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Jenis Laporan
                        </label>
                        <Tabs defaultValue="all" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all" className="cursor-pointer">
                              Semua
                            </TabsTrigger>
                            <TabsTrigger
                              value="lost"
                              className="cursor-pointer"
                            >
                              Hilang
                            </TabsTrigger>
                            <TabsTrigger
                              value="found"
                              className="cursor-pointer"
                            >
                              Temuan
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      <FormField
                        control={form.control}
                        name="dateRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal</FormLabel>
                            <FormControl>
                              <DateRangePicker
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Pilih rentang tanggal"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Radius Pencarian (km)
                        </label>
                        <div className="pt-4">
                          <Slider
                            defaultValue={[5]}
                            max={50}
                            step={1}
                            value={radius}
                            onValueChange={setRadius}
                          />
                          <div className="mt-1 text-center text-sm text-muted-foreground">
                            {radius[0]} km
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <Tabs defaultValue="all" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all" className="cursor-pointer">
                              Semua
                            </TabsTrigger>
                            <TabsTrigger
                              value="open"
                              className="cursor-pointer"
                            >
                              Aktif
                            </TabsTrigger>
                            <TabsTrigger
                              value="closed"
                              className="cursor-pointer"
                            >
                              Selesai
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Hasil Pencarian</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Filter className="h-3 w-3" />
                Semua Kategori
              </Badge>
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" />5 km
              </Badge>
            </div>
          </div>

          {view === "list" ? (
            <SearchResults />
          ) : (
            <div className="h-[600px] rounded-lg overflow-hidden border">
              <SearchMap />
            </div>
          )}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

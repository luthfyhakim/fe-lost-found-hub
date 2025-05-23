"use client";

import DashboardNavbar from "@/components/layouts/dashboard-navbar";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";
import FileUploader from "@/components/file-uploader";
import LocationPicker from "@/components/location-picker";
import DashboardFooter from "@/components/layouts/dashboard-footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  itemName: z.string().min(3, { message: "Nama barang minimal 3 karakter" }),
  category: z.string().min(1, { message: "Pilih kategori barang" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  foundDate: z.date({ required_error: "Pilih tanggal penemuan" }),
  foundTime: z.string().optional(),
  location: z.string().min(3, { message: "Masukkan lokasi penemuan" }),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  contactName: z.string().min(3, { message: "Masukkan nama kontak" }),
  contactPhone: z.string().min(10, { message: "Masukkan nomor telepon valid" }),
  contactEmail: z.string().email({ message: "Masukkan email valid" }),
  keepItem: z.boolean(),
  dropLocation: z.string().optional(),
  reward: z.string().optional(),
  rewardAmount: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ReportLostPage() {
  const router = useRouter();
  const [coordinates, setCoordinates] = useState({
    lat: -6.2088,
    lng: 106.8456,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemName: "",
      category: "",
      description: "",
      foundTime: "",
      location: "",
      coordinates: { lat: -6.2088, lng: 106.8456 },
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      keepItem: false,
      dropLocation: "",
      reward: "",
      rewardAmount: "",
    },
  });

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
  };

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setIsSubmitting(true);
    console.log("Form submitted: ", values);
    console.log("Uploaded file:", uploadedFile);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard?success=true");
    }, 1500);
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    form.setValue("coordinates", { lat, lng });
    form.setValue("location", address);
    setCoordinates({ lat, lng });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-12 px-4 md:px-6">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">
              Laporkan Barang Hilang
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detail Barang Hilang</CardTitle>
              <CardDescription>
                Masukkan informasi lengkap tentang barang yang hilang untuk
                memudahkan proses pencarian.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="itemName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Barang</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Contoh: Dompet Hitam"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori barang" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">
                                Elektronik
                              </SelectItem>
                              <SelectItem value="wallet">Dompet/Tas</SelectItem>
                              <SelectItem value="documents">Dokumen</SelectItem>
                              <SelectItem value="keys">Kunci</SelectItem>
                              <SelectItem value="jewelry">Perhiasan</SelectItem>
                              <SelectItem value="clothing">Pakaian</SelectItem>
                              <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deskripsi Barang</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Deskripsikan barang secara detail (warna, merek, ciri khas, dll)"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="foundDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Penemuan</FormLabel>
                            <FormControl>
                              <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Pilih tanggal kehilangan"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="foundTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waktu Kehilangan (Opsional)</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FileUploader onFileChange={handleFileChange} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Lokasi Kehilangan</h3>
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat Lokasi</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Contoh: Jl. Sudirman No. 123, Jakarta"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coordinates"
                      render={() => (
                        <FormItem>
                          <FormLabel>Pilih Lokasi di Peta</FormLabel>
                          <FormControl>
                            <div className="h-[300px] rounded-md overflow-hidden border">
                              <LocationPicker
                                initialPosition={coordinates}
                                onLocationSelect={handleLocationSelect}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Klik pada peta untuk menandai lokasi kehilangan
                            barang.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informasi Kontak</h3>
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama lengkap Anda"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Contoh: 08123456789"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Contoh: nama@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="reward"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Apakah Anda menawarkan imbalan?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Ya
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Tidak
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("reward") === "yes" && (
                      <FormField
                        control={form.control}
                        name="rewardAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jumlah Imbalan (Opsional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Contoh: Rp 100.000 atau deskripsi imbalan"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Batal
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

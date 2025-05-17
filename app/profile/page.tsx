"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  User,
  Mail,
  Phone,
  Bell,
  Shield,
  LogOut,
  Camera,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import DashboardFooter from "@/components/layouts/dashboard-footer";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";

const userData = {
  id: 1,
  name: "Luthfi Hakim",
  email: "luthfyhakim250404@gmail.com",
  phone: "081234567890",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "Mei 2025",
  bio: "Pengguna aktif Lost & Found Hub",
  address: "Kota Malang, Jawa Timur",
  reports: {
    lost: 3,
    found: 2,
    matched: 1,
  },
};

const profileFormSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  phone: z.string().min(10, { message: "Nomor telepon minimal 10 digit" }),
  bio: z.string().optional(),
  address: z.string().optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" }),
    newPassword: z.string().min(8, { message: "Password minimal 8 karakter" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru tidak cocok dengan konfirmasi password",
    path: ["confirmPassword"],
  });

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  matchAlerts: z.boolean().default(true),
  statusUpdates: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      bio: userData.bio,
      address: userData.address,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      matchAlerts: true,
      statusUpdates: true,
      marketingEmails: false,
    },
  });

  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);
    setIsEditing(false);
  };

  const onPasswordSubmit = (values: z.infer<typeof passwordFormSchema>) => {
    console.log(values);
    passwordForm.reset();
  };

  const onNotificationSubmit = (
    values: z.infer<typeof notificationFormSchema>
  ) => {
    console.log(values);
  };

  const handleLogout = () => {
    router.push("/auth/login");
  };

  const recentReports = [
    {
      id: 1,
      type: "lost",
      name: "Dompet Hitam",
      location: "Mall Grand Indonesia",
      date: "10 Mei 2023",
      status: "open",
    },
    {
      id: 2,
      type: "found",
      name: "Kunci Motor Honda",
      location: "Halte Transjakarta Harmoni",
      date: "11 Mei 2023",
      status: "open",
    },
    {
      id: 3,
      type: "lost",
      name: "Laptop ASUS ROG",
      location: "Stasiun MRT Bundaran HI",
      date: "12 Mei 2023",
      status: "closed",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-1 w-full py-10 px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                title="Ubah foto profil"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Ubah foto profil</span>
              </Button>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {userData.name}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Bergabung sejak {userData.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 md:ml-auto">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 text-sm ${
                      activeTab === "profile" ? "bg-muted font-medium" : ""
                    } hover:bg-muted transition-colors`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4" />
                    Profil
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 text-sm ${
                      activeTab === "security" ? "bg-muted font-medium" : ""
                    } hover:bg-muted transition-colors`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="h-4 w-4" />
                    Keamanan
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 text-sm ${
                      activeTab === "notifications"
                        ? "bg-muted font-medium"
                        : ""
                    } hover:bg-muted transition-colors`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-4 w-4" />
                    Notifikasi
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 text-sm ${
                      activeTab === "reports" ? "bg-muted font-medium" : ""
                    } hover:bg-muted transition-colors`}
                    onClick={() => setActiveTab("reports")}
                  >
                    <MapPin className="h-4 w-4" />
                    Laporan Saya
                  </button>
                </nav>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-6">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informasi Profil</CardTitle>
                      <CardDescription>
                        Kelola informasi profil Anda
                      </CardDescription>
                    </div>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profil
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Form {...profileForm}>
                        <form
                          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Lengkap</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nomor Telepon</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Textarea {...field} />
                                </FormControl>
                                <FormDescription>
                                  Ceritakan sedikit tentang diri Anda (opsional)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Alamat</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                  Alamat Anda (opsional)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                            >
                              Batal
                            </Button>
                            <Button type="submit">Simpan Perubahan</Button>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Nama Lengkap</p>
                            <p>{userData.name}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Email</p>
                            <p>{userData.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Nomor Telepon</p>
                            <p>{userData.phone}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Bergabung Sejak
                            </p>
                            <p>{userData.joinDate}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Bio</p>
                          <p>{userData.bio || "-"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Alamat</p>
                          <p>{userData.address || "-"}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Keamanan</CardTitle>
                    <CardDescription>
                      Kelola password dan pengaturan keamanan akun Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form
                        onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password Saat Ini</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={
                                      showCurrentPassword ? "text" : "password"
                                    }
                                    placeholder="Masukkan password saat ini"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                      setShowCurrentPassword(
                                        !showCurrentPassword
                                      )
                                    }
                                  >
                                    {showCurrentPassword ? (
                                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="sr-only">
                                      {showCurrentPassword
                                        ? "Sembunyikan password"
                                        : "Tampilkan password"}
                                    </span>
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password Baru</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Masukkan password baru"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                      setShowNewPassword(!showNewPassword)
                                    }
                                  >
                                    {showNewPassword ? (
                                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="sr-only">
                                      {showNewPassword
                                        ? "Sembunyikan password"
                                        : "Tampilkan password"}
                                    </span>
                                  </Button>
                                </div>
                              </FormControl>
                              <FormDescription>
                                Password minimal 8 karakter
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Konfirmasi Password Baru</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    placeholder="Konfirmasi password baru"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                      setShowConfirmPassword(
                                        !showConfirmPassword
                                      )
                                    }
                                  >
                                    {showConfirmPassword ? (
                                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="sr-only">
                                      {showConfirmPassword
                                        ? "Sembunyikan password"
                                        : "Tampilkan password"}
                                    </span>
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button type="submit">Ubah Password</Button>
                        </div>
                      </form>
                    </Form>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sesi Login</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="space-y-1">
                            <p className="font-medium">Perangkat Ini</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome di Windows • Jakarta, Indonesia • Aktif
                              sekarang
                            </p>
                          </div>
                          <Badge>Saat Ini</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="space-y-1">
                            <p className="font-medium">iPhone 13</p>
                            <p className="text-sm text-muted-foreground">
                              Safari di iOS • Jakarta, Indonesia • Aktif 2 jam
                              yang lalu
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Keluar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notifikasi</CardTitle>
                    <CardDescription>
                      Kelola preferensi notifikasi Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form
                        onSubmit={notificationForm.handleSubmit(
                          onNotificationSubmit
                        )}
                        className="space-y-4"
                      >
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Notifikasi Email
                                </FormLabel>
                                <FormDescription>
                                  Terima notifikasi melalui email untuk
                                  aktivitas penting
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationForm.control}
                          name="matchAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Match Alerts
                                </FormLabel>
                                <FormDescription>
                                  Dapatkan notifikasi saat ada potensi kecocokan
                                  barang
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationForm.control}
                          name="statusUpdates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Update Status
                                </FormLabel>
                                <FormDescription>
                                  Dapatkan notifikasi saat ada perubahan status
                                  pada laporan Anda
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationForm.control}
                          name="marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Email Marketing
                                </FormLabel>
                                <FormDescription>
                                  Terima email tentang fitur baru dan pembaruan
                                  layanan
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button type="submit">Simpan Preferensi</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}

              {activeTab === "reports" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistik Laporan</CardTitle>
                      <CardDescription>
                        Ringkasan laporan barang hilang dan temuan Anda
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                          <p className="text-3xl font-bold">
                            {userData.reports.lost}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Barang Hilang
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                          <p className="text-3xl font-bold">
                            {userData.reports.found}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Barang Temuan
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                          <p className="text-3xl font-bold">
                            {userData.reports.matched}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Berhasil Dicocokkan
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Laporan Terbaru</CardTitle>
                        <Link href="/reports">
                          <Button variant="outline" size="sm">
                            Lihat Semua
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="all">
                        <TabsList className="mb-4">
                          <TabsTrigger value="all">Semua</TabsTrigger>
                          <TabsTrigger value="lost">Barang Hilang</TabsTrigger>
                          <TabsTrigger value="found">Barang Temuan</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                          <div className="space-y-4">
                            {recentReports.length === 0 ? (
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">
                                  Anda belum memiliki laporan.
                                </p>
                              </div>
                            ) : (
                              recentReports.map((report) => (
                                <div
                                  key={`${report.type}-${report.id}`}
                                  className="flex items-center justify-between p-4 border rounded-md"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={
                                          report.type === "lost"
                                            ? "destructive"
                                            : "success"
                                        }
                                        className="w-16 justify-center"
                                      >
                                        {report.type === "lost"
                                          ? "Hilang"
                                          : "Temuan"}
                                      </Badge>
                                      <span className="font-medium">
                                        {report.name}
                                      </span>
                                      {report.status === "closed" && (
                                        <Badge variant="outline">Selesai</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <MapPin className="h-3 w-3" />
                                      <span>{report.location}</span>
                                      <span>•</span>
                                      <span>{report.date}</span>
                                    </div>
                                  </div>
                                  <Link
                                    href={`/item/${report.type}/${report.id}`}
                                  >
                                    <Button variant="ghost" size="icon">
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                </div>
                              ))
                            )}
                          </div>
                        </TabsContent>
                        <TabsContent value="lost">
                          <div className="space-y-4">
                            {recentReports
                              .filter((report) => report.type === "lost")
                              .map((report) => (
                                <div
                                  key={`${report.type}-${report.id}`}
                                  className="flex items-center justify-between p-4 border rounded-md"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="destructive"
                                        className="w-16 justify-center"
                                      >
                                        Hilang
                                      </Badge>
                                      <span className="font-medium">
                                        {report.name}
                                      </span>
                                      {report.status === "closed" && (
                                        <Badge variant="outline">Selesai</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <MapPin className="h-3 w-3" />
                                      <span>{report.location}</span>
                                      <span>•</span>
                                      <span>{report.date}</span>
                                    </div>
                                  </div>
                                  <Link href={`/item/lost/${report.id}`}>
                                    <Button variant="ghost" size="icon">
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="found">
                          <div className="space-y-4">
                            {recentReports
                              .filter((report) => report.type === "found")
                              .map((report) => (
                                <div
                                  key={`${report.type}-${report.id}`}
                                  className="flex items-center justify-between p-4 border rounded-md"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="success"
                                        className="w-16 justify-center"
                                      >
                                        Temuan
                                      </Badge>
                                      <span className="font-medium">
                                        {report.name}
                                      </span>
                                      {report.status === "closed" && (
                                        <Badge variant="outline">Selesai</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <MapPin className="h-3 w-3" />
                                      <span>{report.location}</span>
                                      <span>•</span>
                                      <span>{report.date}</span>
                                    </div>
                                  </div>
                                  <Link href={`/item/found/${report.id}`}>
                                    <Button variant="ghost" size="icon">
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useMobile } from "../hooks/use-mobile";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Globe,
  Home,
  Layers,
  MapIcon,
  Menu,
  Ruler,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
});

export default function GISPage() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [layers, setLayers] = useState({
    streets: true,
    satellite: false,
    terrain: false,
    buildings: true,
    boundaries: false,
  });

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers({
      ...layers,
      [layer]: !layers[layer],
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-background z-10">
        <div className="container flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <Globe className="h-5 w-5" />
            <span className="font-bold">GeoMapper</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="gap-1">
              <MapIcon className="h-4 w-4" />
              <span>Base Maps</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Layers className="h-4 w-4" />
              <span>Layers</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Ruler className="h-4 w-4" />
              <span>Measure</span>
            </Button>
          </div>

          <div className="flex items-center ml-auto gap-2">
            <div className="relative w-full max-w-[200px] md:max-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search location..."
                className="pl-8 w-full"
              />
            </div>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">GIS Tools</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Base Maps</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="streets-mobile"
                            checked={layers.streets}
                            onCheckedChange={() => toggleLayer("streets")}
                          />
                          <Label htmlFor="streets-mobile">Streets</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="satellite-mobile"
                            checked={layers.satellite}
                            onCheckedChange={() => toggleLayer("satellite")}
                          />
                          <Label htmlFor="satellite-mobile">Satellite</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terrain-mobile"
                            checked={layers.terrain}
                            onCheckedChange={() => toggleLayer("terrain")}
                          />
                          <Label htmlFor="terrain-mobile">Terrain</Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Layers</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="buildings-mobile"
                            checked={layers.buildings}
                            onCheckedChange={() => toggleLayer("buildings")}
                          />
                          <Label htmlFor="buildings-mobile">Buildings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="boundaries-mobile"
                            checked={layers.boundaries}
                            onCheckedChange={() => toggleLayer("boundaries")}
                          />
                          <Label htmlFor="boundaries-mobile">
                            Administrative Boundaries
                          </Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Tools</h3>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Ruler className="h-4 w-4 mr-2" />
                          Measure Distance
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Find Location
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && !isMobile && (
          <aside className="w-[250px] border-r bg-background p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Layers</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Base Maps</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="streets"
                      checked={layers.streets}
                      onCheckedChange={() => toggleLayer("streets")}
                    />
                    <Label htmlFor="streets">Streets</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="satellite"
                      checked={layers.satellite}
                      onCheckedChange={() => toggleLayer("satellite")}
                    />
                    <Label htmlFor="satellite">Satellite</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terrain"
                      checked={layers.terrain}
                      onCheckedChange={() => toggleLayer("terrain")}
                    />
                    <Label htmlFor="terrain">Terrain</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Layers</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="buildings"
                      checked={layers.buildings}
                      onCheckedChange={() => toggleLayer("buildings")}
                    />
                    <Label htmlFor="buildings">Buildings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="boundaries"
                      checked={layers.boundaries}
                      onCheckedChange={() => toggleLayer("boundaries")}
                    />
                    <Label htmlFor="boundaries">
                      Administrative Boundaries
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Analysis Tools</h3>
                <div className="space-y-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between"
                      >
                        <div className="flex items-center">
                          <Ruler className="h-4 w-4 mr-2" />
                          Measure
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => setActiveTool("measure-distance")}
                      >
                        Distance
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setActiveTool("measure-area")}
                      >
                        Area
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveTool("search")}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Location
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 relative">
          {!sidebarOpen && !isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 left-2 z-10 bg-background"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          )}

          <div className="h-full w-full">
            <MapComponent layers={layers} activeTool={activeTool} />
          </div>
        </main>
      </div>
    </div>
  );
}

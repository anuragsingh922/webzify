import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { fetchThemes } from "@/store/imageSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

type WebsiteType = "Ecommerce" | "Service-Based" | "Informative";
type DesignTone = "Professional" | "Playfull and Chill" | "Relax";

interface ThemeImage {
  id: string;
  url: string;
  type: WebsiteType;
  tone: DesignTone;
  alt: string;
}

const ThemeSelector = () => {
  const [websiteType, setWebsiteType] = useState<WebsiteType>();
  const [designTone, setDesignTone] = useState<DesignTone>();
  const dispatch = useDispatch();
  const {
    images,
    loading: imageLoading,
    error,
  } = useSelector((state: RootState) => state.images);

  useEffect(() => {
    // @ts-expect-error for fast development
    dispatch(fetchThemes({ websiteType, designTone }));
  }, [websiteType, designTone, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong.");
    }
  }, [error]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary select-text">
              Theme Selection
            </h1>
            <p className="text-lg text-primary/80 select-text">
              Choose your website preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary select-text">
                Website Type
              </label>
              <Select
                onValueChange={(value) => {
                  setWebsiteType(
                    value === "none" ? undefined : (value as WebsiteType)
                  );
                }}
                value={websiteType || "none"}
              >
                <SelectTrigger className="w-full bg-background text-primary border-input">
                  <SelectValue placeholder="Select website type" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Ecommerce">E-commerce</SelectItem>
                  <SelectItem value="Service-Based">Service-Based</SelectItem>
                  <SelectItem value="Informative">Informative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary select-text">
                Design Tone
              </label>
              <Select
                onValueChange={(value) => {
                  setDesignTone(
                    value === "none" ? undefined : (value as DesignTone)
                  );
                }}
                value={designTone || "none"}
              >
                <SelectTrigger className="w-full bg-background text-primary border-input">
                  <SelectValue placeholder="Select design tone" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Playful and Chill">
                    Playful and Chill
                  </SelectItem>
                  <SelectItem value="Relax">Relax</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-64 bg-muted rounded-lg animate-pulse"
                    />
                  ))
              : images?.map((image) => (
                  <Card
                    key={image._id}
                    className={cn(
                      "overflow-hidden group transition-all duration-300 hover:shadow-xl",
                      "animate-image-fade"
                    )}
                  >
                    <div className="relative h-64">
                      <img
                        src={image.imageUrl}
                        alt={"image"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm font-medium px-4 py-2 bg-black/75 rounded-full select-text">
                            {image.websiteType} - {image.designTone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ThemeSelector;

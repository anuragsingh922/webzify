import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EditImage from "@/components/EditImage";
import {
  setUpdateindex,
  setDeleteindex,
  postThemes,
  deleteThemes,
  fetchThemes,
} from "@/store/imageSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const AdminPannel = () => {
  const {
    images,
    loading: imageLoading,
    error,
  } = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch();
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [selectedImage, setselectedImage] = useState(images[0]);
  const [addingNew, setaddingNew] = useState(false);
  const [websiteType, setWebsiteType] = useState<string>();
  const [designTone, setDesignTone] = useState<string>();

  useEffect(() => {
    // @ts-expect-error for fast development
    dispatch(fetchThemes({ websiteType, designTone }));
  }, [websiteType, designTone, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong.");
    }
  }, [error]);

  const handleDelete = (index: number, themeId: string) => {
    try {
      setDeleteindex(index);
      // @ts-expect-error time limit
      dispatch(deleteThemes({ themeId }))
        // @ts-expect-error time limit
        .unwrap()
        .then(() => {
          setDeleteindex(-1);
          toast.success("Image deleted");
        });
    } catch (error) {
      console.error("Error in deleting the image : ", error);
    }
  };
  return (
    <>
      <Navbar />
      <Card>
        <CardHeader>
          <div className="w-full flex justify-between items-center pl-24 pr-24 mt-2">
            <div className="text-2xl font-bold"></div>
            <Button
              onClick={() => {
                setaddingNew(true);
                setisDialogOpen(true);
              }}
            >
              <Plus />
              Add Image
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary select-text">
                Website Type
              </label>
              <Select
                onValueChange={(value) => {
                  setWebsiteType(
                    value === "none" ? undefined : (value as string)
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
                    value === "none" ? undefined : (value as string)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-11">
            {imageLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-64 bg-muted rounded-lg animate-pulse"
                    />
                  ))
              : images?.map((image, index) => (
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
                      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm font-medium px-4 py-2 bg-black/75 rounded-full select-text">
                            <Button
                              className="text-white hover:text-green-500 bg-transparent hover:bg-transparent"
                              onClick={() => {
                                setaddingNew(false);
                                setselectedImage(image);
                                setisDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button className="text-white hover:text-green-500 bg-transparent hover:bg-transparent" onClick={()=> handleDelete(index , image?._id)}>
                              Delete
                            </Button>
                          </p>
                        </div>
                      </div> */}
                    </div>
                    <Card className="border border-none">
                      <CardContent>
                        <CardHeader>
                          <CardTitle>Image Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul>
                            <li>Website Type : {image?.websiteType}</li>
                            <li>Design Tone : {image?.designTone}</li>
                            <li>Status : {image?.status}</li>
                          </ul>
                          <div className="flex justify-start gap-3 mt-3">
                            <Button
                              onClick={() => {
                                setaddingNew(false);
                                setselectedImage(image);
                                setisDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete(index, image?._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </CardContent>
                    </Card>
                  </Card>
                ))}
          </div>
        </CardContent>
      </Card>

      {isDialogOpen && (
        <EditImage
          isOpen={isDialogOpen}
          onClose={() => setisDialogOpen(false)}
          image={selectedImage}
          newImage={addingNew}
          handleDelete={handleDelete}
        />
      )}

      <Footer />
    </>
  );
};

export default AdminPannel;

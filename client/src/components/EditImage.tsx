import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { postThemes, updateTheme } from "@/store/imageSlice";
import { toast } from "sonner";

const EditImage = ({ isOpen, onClose, image, newImage, handleDelete }) => {
  const dispatch = useDispatch();
  const [newURL, setnewUrl] = useState("");
  const [newWebsiteType, setnewWebsiteType] = useState("");
  const [newDesignTone, setnewDesignTone] = useState("");
  const [isApproved, setisApproved] = useState(true);

  useEffect(() => {
    if (!newImage) {
      setnewUrl(image?.imageUrl);
      setnewWebsiteType(image?.websiteType);
      setnewDesignTone(image?.designTone);
      setisApproved(image?.status);
    }
  }, [newImage, image]);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              <h2 className="m-2">Edit Image</h2>
            </DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <div className="flex flex-col justify-center gap-2">
              <label htmlFor="imageUrl">Image URL</label>
              <Input
                value={newURL}
                onChange={(e) => setnewUrl(e.target.value)}
              ></Input>
              <label htmlFor="websiteType">Website Type</label>
              <Input
                value={newWebsiteType}
                onChange={(e) => setnewWebsiteType(e.target.value)}
              ></Input>
              <label htmlFor="imageUrl">Design Type</label>
              <Input
                value={newDesignTone}
                onChange={(e) => setnewDesignTone(e.target.value)}
              ></Input>
              <div className="flex gap-2">
                <label htmlFor="imageUrl">Approved</label>
                <Switch
                  className="bg-transparent text-foreground"
                  checked={isApproved}
                  onClick={() => setisApproved(!isApproved)}
                />
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <div className="w-full flex justify-center">
              {!newImage ? (
                <Button
                  id="updatebtn"
                  onClick={() => {
                    document.getElementById("updatebtn").innerText =
                      "Updating...";
                    dispatch(
                      // @ts-expect-error time
                      updateTheme({
                        themeId: image?._id,
                        imageUrl: newURL,
                        websiteType: newWebsiteType,
                        designTone: newDesignTone,
                        status: isApproved ? "Approved" : "Pending",
                      })
                    )
                      // @ts-expect-error time
                      .unwrap()
                      .then(() => {
                        onClose();
                        toast.success("Image updated");
                      });
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  id="newImagebtn"
                  onClick={() => {
                    document.getElementById("newImagebtn").innerText =
                      "Adding...";
                    dispatch(
                      // @ts-expect-error time limit
                      postThemes({
                        themeId: image?._id,
                        imageUrl: newURL,
                        websiteType: newWebsiteType,
                        designTone: newDesignTone,
                        status: isApproved ? "Approved" : "Pending",
                      })
                    )
                      // @ts-expect-error time limit
                      .unwrap()
                      .then(() => {
                        onClose();
                        toast.success("Image Added");
                      });
                  }}
                >
                  Add
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditImage;

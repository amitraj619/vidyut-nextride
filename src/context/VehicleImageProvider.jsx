import { createContext, useState, useCallback, useMemo } from "react";
import { getVehicleImgUrl } from "../services/commonServices";
import { MAX_IMAGES_STORE } from "../services/constants";

export const VehicleImageContext = createContext();

const VehicleImageProvider = ({ children }) => {
  const [vehicleThumbnails, setVehicleThumbnails] = useState({});
  const [vehicleImages, setVehicleImages] = useState({});

  const fetchImages = useCallback(
    async (vehicleId, imageIds, type = "thumbnails") => {
      try {
        const state = type === "thumbnails" ? vehicleThumbnails : vehicleImages;
        const setState =
          type === "thumbnails" ? setVehicleThumbnails : setVehicleImages;

        const idsToFetch = imageIds?.filter((id) => !state[id]);
        if (idsToFetch.length === 0) return;
        const imageMap = {};

        await Promise.all(
          idsToFetch.map(async (id) => {
            const data = await getVehicleImgUrl(vehicleId, id);
            if (data?.status && data?.data?.downloadPreSignedUrl) {
              imageMap[id] = data.data.downloadPreSignedUrl;
            }
          })
        );

        if (Object.keys(imageMap).length > 0) {
          setState((prev) => {
            const combined = { ...prev, ...imageMap };
            const keys = Object.keys(combined);
            // Remove oldest entries if exceeding MAX_IMAGES_STORE
            if (keys.length > MAX_IMAGES_STORE) {
              const excess = keys.length - MAX_IMAGES_STORE;
              for (let i = 0; i < excess; i++) {
                delete combined[keys[i]];
              }
            }

            return combined;
          });
        }
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    },
    [vehicleThumbnails, vehicleImages]
  );

  const contextValue = useMemo(
    () => ({
      vehicleThumbnails,
      vehicleImages,
      fetchAndStoreThumbnails: (vehicleId, imageIds) =>
        fetchImages(vehicleId, imageIds, "thumbnails"),
      fetchAndStoreVehicleImages: (vehicleId, imageIds) =>
        fetchImages(vehicleId, imageIds, "images"),
      setVehicleImages,
    }),
    [vehicleThumbnails, vehicleImages, fetchImages]
  );

  return (
    <VehicleImageContext.Provider value={contextValue}>
      {children}
    </VehicleImageContext.Provider>
  );
};

export default VehicleImageProvider;

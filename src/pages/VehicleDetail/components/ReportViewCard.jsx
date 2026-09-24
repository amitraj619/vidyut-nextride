import { useEffect, useState } from "react";
import { getVehicleImgUrl } from "../../../services/commonServices";
import { findFieldFromFetchedData } from "../../../utils/commonUtils";
import "../SCSS/style.scss";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const ReportViewCard = ({
  partsData,
  vehicleId,
  partsImages,
  setPartsImages,
}) => {
  const [imageIds, setImageIds] = useState([]);

  const fetchImageUrls = async (idsToFetch) => {
    try {
      const results = await Promise.all(
        idsToFetch.map(async (id) => {
          const data = await getVehicleImgUrl(vehicleId, id);
          if (data?.status) {
            return { id, url: data?.data?.downloadPreSignedUrl };
          }
          return null;
        })
      );

      const newImages = results.reduce((acc, curr) => {
        if (curr) acc[curr.id] = curr.url;
        return acc;
      }, {});

      // Merge the new images with existing ones
      setPartsImages((prev) => ({ ...prev, ...newImages }));
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  };

  useEffect(() => {
    const ids =
      findFieldFromFetchedData(partsData?.fields, "image")?.fieldValue || [];
    setImageIds(ids);

    const idsToFetch = ids.filter((id) => !partsImages?.[id]);

    if (idsToFetch.length > 0) {
      fetchImageUrls(idsToFetch);
    }
  }, [partsData]);

  const partName = findFieldFromFetchedData(
    partsData?.fields,
    "name"
  )?.fieldValue;
  const partCondition = findFieldFromFetchedData(
    partsData?.fields,
    "condition"
  )?.fieldValue;

  return (
    <div className="report_view_card">
      {imageIds.map((id) =>
        partsImages?.[id] ? (
          <img
            key={id}
            src={partsImages?.[id]}
            alt={id}
            className="report_view_parts_image"
          />
        ) : (
          <CustomSkeleton height={203} width={350} borderRadius={8} />
        )
      )}
      <div className="report_view_parts_condition">
        {partName}
        {partCondition ? ": " + partCondition : ""}
      </div>
    </div>
  );
};

export default ReportViewCard;

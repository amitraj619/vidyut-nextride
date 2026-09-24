import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { VehicleImageContext } from "../../context/VehicleImageProvider";
import { Skeleton } from "antd";

const VehicleCard = ({
  thumbnailIds = [],
  vehicle_name,
  odometer,
  rto,
  emi_price,
  vehicle_price,
  navigate_url,
  cardStyle = {},
  vehicleId,
  handleCardClickEventCall = null,
}) => {
  const { vehicleThumbnails, fetchAndStoreThumbnails } =
    useContext(VehicleImageContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!vehicleId || !thumbnailIds?.length) return;

    const missingThumbnailIds = thumbnailIds.filter(
      (id) => !vehicleThumbnails[id]
    );

    if (missingThumbnailIds.length > 0) {
      fetchAndStoreThumbnails(vehicleId, missingThumbnailIds);
    }
  }, [thumbnailIds, vehicleThumbnails, vehicleId]);

  const thumbnailUrl = thumbnailIds.find((id) => vehicleThumbnails[id]);

  const handleNavigate = () => {
    navigate({ pathname: navigate_url, search: location.search });
    if (handleNavigate) handleCardClickEventCall();
  };

  return (
    <div
      className="vehicle_card"
      style={cardStyle}
      onClick={handleNavigate}
      data-aos="fade-up"
    >
      <div className="vehicle_image">
        {thumbnailUrl ? (
          <img src={vehicleThumbnails[thumbnailUrl]} alt={vehicle_name} />
        ) : (
          <Skeleton.Image active className="image_skeleton" />
        )}
      </div>
      <div className="vehicle_details_container">
        <h2 className="vehicle_name">{vehicle_name}</h2>
        <div className="vehicle_details">
          <span className="custom_tag">
            {odometer} {t("VEHICLE_DETAILS.KM")}
          </span>
          <span className="custom_tag">{rto}</span>
        </div>
        <div className="price_details">
          <div className="emi_starts">
            <label>{t("VEHICLE_DETAILS.EMI_STARTS")}</label>
            <div className="emi_price">
              ₹{emi_price}/{t("VEHICLE_DETAILS.EMI_CALCULATOR.M")}*
            </div>
          </div>
          <div className="vehicle_price">₹{vehicle_price}</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;

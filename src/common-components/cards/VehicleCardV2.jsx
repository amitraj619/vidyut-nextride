import { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { VehicleImageContext } from "../../context/VehicleImageProvider";
import "../SCSS/style.scss";
import { Skeleton } from "antd";
import {
  charger_icon,
  lock_icon,
  odometer_icon,
} from "../../assets/SVGIcons/CommonIcons";

const VehicleCardV2 = ({
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
  chargeTime,
  isVerified = true,
  model,
  vehicle_type,
  vehicleNo,
  oem,
  onCheckAmountClick,
  onTestRideClick,
}) => {
  const { vehicleThumbnails, fetchAndStoreThumbnails } =
    useContext(VehicleImageContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!vehicleId || !thumbnailIds?.length) return;

    const missingThumbnailIds = thumbnailIds.filter(
      (id) => !vehicleThumbnails[id],
    );

    if (missingThumbnailIds.length > 0) {
      fetchAndStoreThumbnails(vehicleId, missingThumbnailIds);
    }
  }, [thumbnailIds, vehicleThumbnails, vehicleId]);

  const thumbnailUrl = thumbnailIds.find((id) => vehicleThumbnails[id]);

  const handleNavigate = () => {
    navigate({ pathname: navigate_url, search: location.search });
    if (handleCardClickEventCall) handleCardClickEventCall();
  };

  const handleVehicleEnquiryClick = (e, clickType) => {
    e.stopPropagation();

    searchParams.set("model", model);
    searchParams.set("vehicle_type", vehicle_type);
    const destinationPath = `/all-ev-vehicles/${vehicleId}/details/${vehicleNo}/${oem}/TEST_RIDE/customer-enquiry`;

    if (clickType === "CHECK_AMOUNT" && onCheckAmountClick) {
      onCheckAmountClick(destinationPath);
    } else if (clickType === "TEST_RIDE" && onTestRideClick) {
      onTestRideClick(destinationPath);
    }

    setTimeout(() => {
      navigate({
        pathname: destinationPath,
        search: searchParams.toString(),
      });
    }, 10);
  };

  return (
    <div
      className="vehicle_card_v2"
      style={{
        ...cardStyle,
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #eee",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.2s ease",
      }}
      onClick={handleNavigate}
      data-aos="fade-up"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "180px",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#f9fafb",
        }}
      >
        {isVerified && (
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: "2px",
              background: "#16a34a",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              zIndex: 2,
            }}
          >
            ✔ {t("VEHICLE_DETAILS.VIDYUT_VERIFIED")}
          </div>
        )}

        {(!thumbnailUrl || !isImageLoaded) && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton.Image active style={{ width: "100%", height: "100%" }} />
          </div>
        )}

        {thumbnailUrl && (
          <img
            key={thumbnailUrl}
            src={vehicleThumbnails[thumbnailUrl]}
            alt={vehicle_name}
            onLoad={() => setIsImageLoaded(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "#f9fafb",
              opacity: isImageLoaded ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
          />
        )}
      </div>

      <div
        style={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
              lineHeight: "1.3",
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "39px",
            }}
          >
            {vehicle_name}
          </div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#6b7280",
              whiteSpace: "nowrap",
            }}
          >
            ₹{vehicle_price}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#6b7280",
            fontWeight: 500,
            marginBottom: "16px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {odometer_icon}
            {odometer} {t("VEHICLE_DETAILS.KM")}
          </span>

          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {charger_icon}
            {(
              (+chargeTime?.match(/(\d+)H/)?.[1] || 0) +
              (+chargeTime?.match(/(\d+)M/)?.[1] || 0) / 60
            ).toFixed(1)}{" "}
            {t("VEHICLE_DETAILS.HR_CHARGE")}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            background: "#f9fafb",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 auto", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>
              {t("VEHICLE_DETAILS.EASY_EMI_FROM")}
            </div>
            <div style={{ fontWeight: 600 }}>
              ₹{emi_price}
              <span style={{ fontSize: "11px", color: "#6b7280" }}>
                {" "}
                /{t("VEHICLE_DETAILS.EMI_CALCULATOR.M")}*
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "4px",
              flex: "0 0 auto",
            }}
          >
            <span
              onClick={(e) => handleVehicleEnquiryClick(e, "CHECK_AMOUNT")}
              style={{
                fontSize: "10px",
                color: "#6b7280",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t("VEHICLE_DETAILS.DOWNPAYMENT_LOW_AS")}
            </span>
            <button
              onClick={(e) => handleVehicleEnquiryClick(e, "CHECK_AMOUNT")}
              style={{
                background: "#f1e9fe",
                color: "#7225f5",
                border: "none",
                borderRadius: "999px",
                padding: "6px 10px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {lock_icon} {t("VEHICLE_DETAILS.CHECK_AMOUNT")}
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "1px solid #eee",
          marginTop: "auto",
        }}
      >
        <button
          onClick={(e) => handleVehicleEnquiryClick(e, "TEST_RIDE")}
          style={{
            flex: "1 1 0",
            background: "linear-gradient(90deg, #925af1 0%, #7225f5 100%)",
            color: "#fff",
            border: "none",
            padding: "12px 8px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "1.2",
            cursor: "pointer",
          }}
        >
          {t("VEHICLE_DETAILS.BOOK_FREE_TEST_RIDE")}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
          style={{
            flex: "1 1 0",
            background: "#f3f4f6",
            color: "#7225f5",
            border: "none",
            padding: "12px 8px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "1.2",
            cursor: "pointer",
          }}
        >
          {t("VEHICLE_DETAILS.VIEW_DETAILS", "View Details")}
        </button>
      </div>
    </div>
  );
};

export default VehicleCardV2;

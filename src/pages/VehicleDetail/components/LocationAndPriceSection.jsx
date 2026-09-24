import { purple_right_arrow_icon } from "../../../assets/SVGIcons/CommonIcons";
import {
  file_icon,
  marker_pin_icon,
  navigation_pointer_icon,
} from "../../../assets/SVGIcons/VehicleDetailsPageIcons";
import { VehicleListing } from "../../../services/constants";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  getEMIStartsValue,
  getFormattedCurrency,
} from "../../../utils/commonUtils";
import "../SCSS/style.scss";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const LocationReportCard = ({
  text_icon,
  text,
  right_icon,
  handleClick = () => {},
  loading,
}) => {
  return (
    <div className="location_report_sec_card" onClick={handleClick}>
      <div className="icon_with_text">
        {loading ? (
          <CustomSkeleton height={24} width={250} borderRadius={4} />
        ) : (
          <>
            {text_icon} {text}
          </>
        )}
      </div>
      <div className="icon">
        {loading ? (
          <CustomSkeleton height={24} width={24} borderRadius={16} />
        ) : (
          right_icon
        )}
      </div>
    </div>
  );
};

const PriceInfoCard = ({ label, value, loading }) => {
  return (
    <div className="price_info">
      <div className="label">
        {" "}
        {loading ? (
          <CustomSkeleton height={16} width={60} borderRadius={4} />
        ) : (
          label
        )}{" "}
      </div>
      <div className="value">
        {loading ? (
          <CustomSkeleton height={20} width={75} borderRadius={4} />
        ) : (
          <>₹{getFormattedCurrency(value)}</>
        )}
      </div>
    </div>
  );
};

const LocationAndPriceSection = ({
  vehicleData,
  schema,
  handleReportOpen,
  loading,
}) => {
  const box2Ref = useRef(null);
  const { t } = useTranslation();

  const openGoogleMapUsingLatLong = (locationString) => {
    if (!locationString) return;

    const [lat, lng] = locationString.split(",").map((coord) => coord.trim());

    if (lat && lng) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
    } else {
      console.error("Invalid location string");
    }
  };

  return (
    <div
      className="section_container location_and_price"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="location_report_sec">
        <LocationReportCard
          text_icon={marker_pin_icon}
          text={`${
            findFieldFromFetchedData(vehicleData, "currentAddress")?.fieldValue
          }, ${fieldKeyAndValueMap(
            schema,
            VehicleListing,
            "city",
            findFieldFromFetchedData(vehicleData, "city")?.fieldValue
          )}`}
          right_icon={
            findFieldFromFetchedData(vehicleData, "currentAddressLatLong")
              ?.fieldValue
              ? navigation_pointer_icon
              : ""
          }
          loading={loading}
          handleClick={() =>
            openGoogleMapUsingLatLong(
              findFieldFromFetchedData(vehicleData, "currentAddressLatLong")
                ?.fieldValue
            )
          }
        />
        <LocationReportCard
          text_icon={file_icon}
          text={t("VEHICLE_DETAILS.VIEW_INSPECTION_REPORT")}
          right_icon={purple_right_arrow_icon}
          handleClick={() => handleReportOpen(null)}
          loading={loading}
        />
      </div>
      <div className="price_sec">
        <div
          className={`box_1 w-50 ${loading ? "col-7" : ""} border`}
          style={
            {
              // width: !loading && window.innerWidth - box1Width - 40,
            }
          }
        >
          <PriceInfoCard
            label={t("VEHICLE_DETAILS.OUR_PRICE")}
            value={
              findFieldFromFetchedData(vehicleData, "targetSellingPrice")
                ?.fieldValue
            }
            loading={loading}
          />
        </div>

        <div
          className="box_2 border w-50"
          ref={box2Ref}
          style={{ width: "auto", whiteSpace: "nowrap" }}
        >
          <PriceInfoCard
            label={t("VEHICLE_DETAILS.EMI_STARTS")}
            value={getEMIStartsValue(
              findFieldFromFetchedData(vehicleData, "targetSellingPrice")
                ?.fieldValue
            )}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationAndPriceSection;

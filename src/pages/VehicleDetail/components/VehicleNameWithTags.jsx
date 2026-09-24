import { VehicleListing } from "../../../services/constants";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  getFormattedCurrency,
  getRto,
} from "../../../utils/commonUtils";
import "../SCSS/style.scss";
import { useTranslation } from "react-i18next";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const VehicleNameWithTags = ({ vehicleData, schema, loading }) => {
  const { t } = useTranslation();
  const year = String(
    findFieldFromFetchedData(vehicleData, "registrationYear")?.fieldValue
  );

  const oem = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "oem",
    findFieldFromFetchedData(vehicleData, "oem")?.fieldValue
  );

  const model = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "model",
    findFieldFromFetchedData(vehicleData, "model")?.fieldValue
  );

  const variant = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "variant",
    findFieldFromFetchedData(vehicleData, "variant")?.fieldValue
  );
  return (
    <div
      className="section_container vehicle_name_with_tags"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h2 className="vehicle_name">
        {loading ? (
          <CustomSkeleton height={28} width={330} borderRadius={4} />
        ) : (
          <>
            {year} {oem} {model} {variant}{" "}
          </>
        )}
      </h2>
      <div className="vehicle_tags">
        {loading ? (
          <>
            <CustomSkeleton height={24} width={80} borderRadius={4} />
            <CustomSkeleton height={24} width={110} borderRadius={4} />
            <CustomSkeleton height={24} width={50} borderRadius={4} />
            <CustomSkeleton height={24} width={80} borderRadius={4} />
          </>
        ) : (
          <>
            <div className="custom_tag">
              {getFormattedCurrency(
                findFieldFromFetchedData(vehicleData, "currentOdometer")
                  ?.fieldValue
              )}{" "}
              {t("VEHICLE_DETAILS.KM")}
            </div>

            <div className="custom_tag">
              {getRto(
                findFieldFromFetchedData(vehicleData, "vehicleRegNumber")
                  ?.fieldValue
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleNameWithTags;

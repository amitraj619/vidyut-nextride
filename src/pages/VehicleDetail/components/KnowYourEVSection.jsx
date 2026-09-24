import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import {
  battery_capacity_icon,
  charging_time_icon,
  insurance_validity_icon,
  manufacture_year_icon,
  no_of_owners_icon,
  reg_date_icon,
  reg_number_icon,
  rto_icon,
  top_speed_icon,
} from "../../../assets/SVGIcons/VehicleDetailsPageIcons";
import {
  convertFromISO8601Duration,
  findFieldFromFetchedData,
  formatTime,
} from "../../../utils/commonUtils";
import "../SCSS/style.scss";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const KnowYourEVCard = ({ icon, label, value, loading }) => {
  return (
    <div className="col-6 know_your_ev_details">
      <div className="know_your_ev_icon">
        {loading ? (
          <CustomSkeleton height={30} width={30} borderRadius={16} />
        ) : (
          icon
        )}
      </div>
      <div className="know_your_ev_data">
        <div className="know_your_ev_details_label">
          {loading ? (
            <CustomSkeleton height={16} width={92} borderRadius={4} />
          ) : (
            label
          )}
        </div>
        <div className="know_your_ev_details_value">
          {loading ? (
            <CustomSkeleton height={16} width={92} borderRadius={4} />
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
};

const KnowYourEVSection = ({ vehicleData, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="section_container know_your_ev" data-aos="fade-up">
      <h2 className="section_header px-0">
        {t("VEHICLE_DETAILS.KNOW_YOUR_EV.TITLE")}
      </h2>
      <div className="know_your_ev_container">
        <div className="row know_your_ev_details_con">
          <KnowYourEVCard
            icon={reg_number_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.REG_NO")}
            value={
              findFieldFromFetchedData(vehicleData, "vehicleRegNumber")
                ?.fieldValue
            }
            loading={loading}
          />
          <KnowYourEVCard
            icon={reg_date_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.REG_DATE")}
            value={
              findFieldFromFetchedData(vehicleData, "registrationDate")
                ?.fieldValue
            }
            loading={loading}
          />
          <KnowYourEVCard
            icon={insurance_validity_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.INSURANCE_VALIDITY")}
            value={
              String(
                findFieldFromFetchedData(vehicleData, "insuranceValidity")
                  ?.fieldValue
              )?.split("-")[0]
            }
            loading={loading}
          />
          <KnowYourEVCard
            icon={no_of_owners_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.NO_OF_OWNERS")}
            value={String(
              findFieldFromFetchedData(vehicleData, "noOfOwners")?.fieldValue
            )?.padStart(2, "0")}
            loading={loading}
          />
          <KnowYourEVCard
            icon={rto_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.RTO")}
            value={findFieldFromFetchedData(vehicleData, "rto")?.fieldValue}
            loading={loading}
          />
          <KnowYourEVCard
            icon={battery_capacity_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.BATTERY_CAPACITY")}
            value={t("VEHICLE_DETAILS.KNOW_YOUR_EV.BATTERY_CAPACITY_VALUE", {
              value:
                findFieldFromFetchedData(vehicleData, "batterySpec")
                  ?.fieldValue || "--",
            })}
            loading={loading}
          />
          <KnowYourEVCard
            icon={top_speed_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.TOP_SPEED")}
            value={t("VEHICLE_DETAILS.KNOW_YOUR_EV.TOP_SPEED_VALUE", {
              value:
                findFieldFromFetchedData(vehicleData, "maxSpeed")?.fieldValue ||
                "--",
            })}
            loading={loading}
          />
          <KnowYourEVCard
            icon={charging_time_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.CHARGING_TIME")}
            value={formatTime(
              convertFromISO8601Duration(
                findFieldFromFetchedData(vehicleData, "chargingTime")
                  ?.fieldValue
              )
            )}
            loading={loading}
          />
          <KnowYourEVCard
            icon={manufacture_year_icon}
            label={t("VEHICLE_DETAILS.KNOW_YOUR_EV.MANUFACTURE_YEAR")}
            value={
              String(
                findFieldFromFetchedData(vehicleData, "manufacturingYear")
                  ?.fieldValue
              )?.split("-")[0]
            }
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowYourEVSection;

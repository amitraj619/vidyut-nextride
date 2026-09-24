import { right_arrow_icon } from "../../../assets/SVGIcons/CommonIcons";
import {
  fixed_parts_icon,
  imperfection_icon,
  perfect_condition_icon,
} from "../../../assets/SVGIcons/VehicleDetailsPageIcons";
import { findFieldFromFetchedData } from "../../../utils/commonUtils";
import "../SCSS/style.scss";
import { useTranslation } from "react-i18next";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const InspectionReportCard = ({
  report_icon,
  report_text,
  report_desc,
  report_count,
  count_bg_color,
  count_color,
  is_last_card = false,
  is_component_show = true,
  handleClick = () => {},
  loading,
}) => {
  return (
    <div
      className={`inspection_report_card ${!is_last_card && "border-bottom"} ${
        loading ? "d-flex" : is_component_show ? "" : "d-none"
      }`}
      onClick={handleClick}
    >
      <div className="report_title">
        <div className="report_card_title_left">
          <div className="report_icon">
            {loading ? (
              <CustomSkeleton height={24} width={24} borderRadius={16} />
            ) : (
              report_icon
            )}
          </div>
          <div className="report_text">
            {loading ? (
              <CustomSkeleton height={24} width={118} borderRadius={4} />
            ) : (
              report_text
            )}
          </div>
          <div
            className="report_count"
            style={{ backgroundColor: count_bg_color, color: count_color }}
          >
            {loading ? (
              <CustomSkeleton height={24} width={24} borderRadius={4} />
            ) : (
              report_count
            )}
          </div>
        </div>
        <div className="report_card_title_right_icon">
          {loading ? (
            <CustomSkeleton height={24} width={24} borderRadius={16} />
          ) : (
            right_arrow_icon
          )}
        </div>
      </div>
      <div className="report_desc">
        {loading ? (
          <>
            <CustomSkeleton height={16} width={280} borderRadius={4} />
            <CustomSkeleton height={16} width={230} borderRadius={4} />
            <CustomSkeleton height={16} width={180} borderRadius={4} />
          </>
        ) : (
          report_desc
        )}
      </div>
    </div>
  );
};

const InspectionReportSection = ({
  inspection_report,
  handleReportOpen = () => {},
  loading,
}) => {
  const { t } = useTranslation();
  const report =
    inspection_report?.childObjects?.[inspection_report?.fieldValue?.at(-1)];

  const imperfectParts = findFieldFromFetchedData(
    report?.fields,
    "imperfectParts"
  );
  const refurbishedParts = findFieldFromFetchedData(
    report?.fields,
    "refurbishedParts"
  );
  const perfectParts = findFieldFromFetchedData(report?.fields, "perfectParts");

  return (
    <div className="section_container inspection_report" data-aos="fade-up">
      <h2 className="section_header px-0">
        {t("VEHICLE_DETAILS.INSPECTION_REPORT.TITLE")}
      </h2>
      <div className="inspection_report_container">
        <InspectionReportCard
          report_icon={imperfection_icon}
          report_text={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.IMPERFECT_PARTS.TITLE"
          )}
          report_desc={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.IMPERFECT_PARTS.DESC"
          )}
          report_count={imperfectParts?.fieldValue?.length || 0}
          count_bg_color="#FFF6E9"
          count_color="#CC7A00"
          is_component_show={imperfectParts?.fieldValue?.length > 0}
          handleClick={() => handleReportOpen("1")}
          loading={loading}
        />
        <InspectionReportCard
          report_icon={fixed_parts_icon}
          report_text={t("VEHICLE_DETAILS.INSPECTION_REPORT.FIXED_PARTS.TITLE")}
          report_desc={t("VEHICLE_DETAILS.INSPECTION_REPORT.FIXED_PARTS.DESC")}
          report_count={refurbishedParts?.fieldValue?.length || 0}
          count_bg_color="#F7F1FF"
          count_color="#7225F5"
          is_component_show={refurbishedParts?.fieldValue?.length > 0}
          handleClick={() => handleReportOpen("2")}
          loading={loading}
        />
        <InspectionReportCard
          report_icon={perfect_condition_icon}
          report_text={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.PERFECT_CONDITION.TITLE"
          )}
          report_desc={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.PERFECT_CONDITION.DESC"
          )}
          report_count={perfectParts?.fieldValue?.length || 0}
          count_bg_color="#E7F3F1"
          count_color="#157B6A"
          is_last_card={true}
          is_component_show={perfectParts?.fieldValue?.length > 0}
          handleClick={() => handleReportOpen("3")}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default InspectionReportSection;

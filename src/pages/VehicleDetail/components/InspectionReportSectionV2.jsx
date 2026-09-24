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
  card_bg_color = "#FFFFFF",
  is_last_card = false,
  is_component_show = true,
  handleClick = () => {},
  loading,
}) => {
  if (!loading && !is_component_show) return null;

  return (
    <div
      className={`d-flex align-items-start p-3 ${
        !is_last_card ? "border-bottom" : ""
      }`}
      style={{
        backgroundColor: card_bg_color,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onClick={handleClick}
    >
      {/* Left: Icon */}
      <div className="me-3 mt-1 flex-shrink-0">
        {loading ? (
          <CustomSkeleton height={24} width={24} borderRadius={16} />
        ) : (
          report_icon
        )}
      </div>

      {/* Middle: Text Content */}
      <div className="flex-grow-1 pe-2">
        {loading ? (
          <>
            <CustomSkeleton height={20} width={200} borderRadius={4} />
            <div className="mt-2">
              <CustomSkeleton height={14} width="100%" borderRadius={4} />
              <CustomSkeleton height={14} width="80%" borderRadius={4} />
            </div>
          </>
        ) : (
          <>
            <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "15px" }}>
              {report_count} {report_text}
            </h6>
            <small
              className="text-muted d-block"
              style={{ fontSize: "13px", lineHeight: "1.4" }}
            >
              {report_desc}
            </small>
          </>
        )}
      </div>

      {/* Right: Arrow */}
      <div className="ms-2 mt-1 flex-shrink-0 text-muted">
        {loading ? (
          <CustomSkeleton height={24} width={24} borderRadius={16} />
        ) : (
          right_arrow_icon || <span className="fs-5">›</span>
        )}
      </div>
    </div>
  );
};

const InspectionReportSectionV2 = ({
  inspection_report,
  handleReportOpen = () => {},
  loading,
}) => {
  const { t } = useTranslation();
  const report =
    inspection_report?.childObjects?.[inspection_report?.fieldValue?.at(-1)];

  const perfectParts = findFieldFromFetchedData(report?.fields, "perfectParts");
  const imperfectParts = findFieldFromFetchedData(
    report?.fields,
    "imperfectParts",
  );
  const refurbishedParts = findFieldFromFetchedData(
    report?.fields,
    "refurbishedParts",
  );

  return (
    <div className="w-100 mb-4" data-aos="fade-up">
      <h5 className="fw-bold mb-3">
        {t("VEHICLE_DETAILS.INSPECTION_REPORT.TITLE") || "Inspection report"}
      </h5>

      <div className="border rounded-4 overflow-hidden bg-white shadow-sm">
        {/* Perfect Condition */}
        <InspectionReportCard
          report_icon={perfect_condition_icon}
          report_text={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.PERFECT_CONDITION.TITLE",
          )}
          report_desc={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.PERFECT_CONDITION.DESC",
          )}
          report_count={perfectParts?.fieldValue?.length || 0}
          card_bg_color="#F6FCF8" // Subtle green background
          is_component_show={perfectParts?.fieldValue?.length > 0}
          handleClick={() => handleReportOpen("3")}
          loading={loading}
        />

        {/* Imperfections */}
        <InspectionReportCard
          report_icon={imperfection_icon}
          report_text={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.IMPERFECT_PARTS.TITLE",
          )}
          report_desc={t(
            "VEHICLE_DETAILS.INSPECTION_REPORT.IMPERFECT_PARTS.DESC",
          )}
          report_count={imperfectParts?.fieldValue?.length || 0}
          card_bg_color="#FFFFFF"
          is_component_show={imperfectParts?.fieldValue?.length > 0}
          handleClick={() => handleReportOpen("1")}
          loading={loading}
        />

        {/* Fixed Parts */}
        <InspectionReportCard
          report_icon={fixed_parts_icon}
          report_text={t("VEHICLE_DETAILS.INSPECTION_REPORT.FIXED_PARTS.TITLE")}
          report_desc={t("VEHICLE_DETAILS.INSPECTION_REPORT.FIXED_PARTS.DESC")}
          report_count={refurbishedParts?.fieldValue?.length || 0}
          card_bg_color="#FFFFFF"
          is_last_card={true}
          is_component_show={refurbishedParts?.fieldValue?.length > 0}
          handleClick={() => handleReportOpen("2")}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default InspectionReportSectionV2;

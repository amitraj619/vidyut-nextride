import { Collapse, Modal } from "antd";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import {
  fixed_parts_icon,
  imperfection_icon,
  perfect_condition_icon,
} from "../../../assets/SVGIcons/VehicleDetailsPageIcons";
import "../SCSS/style.scss";
import { useEffect, useMemo, useState } from "react";
import { findFieldFromFetchedData } from "../../../utils/commonUtils";
import ReportViewCard from "./ReportViewCard";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";
import { CLICK } from "../../../services/constants";

const CollapseHeading = ({ icon, title, count, countBgColor, countColor }) => {
  return (
    <div className="report_collapse_heading d-flex align-items-center gap-2">
      {icon}
      <div className="collapse_title fw-bold flex-grow-1">{title}</div>
      <span
        className="collapse_count rounded-pill px-2 py-1 text-center"
        style={{
          backgroundColor: countBgColor,
          color: countColor,
          fontSize: "12px",
          minWidth: "24px",
        }}
      >
        {count}
      </span>
    </div>
  );
};

const VehicleReportModalV2 = ({
  bottomSheetVisible,
  closeBottomSheet,
  reportData,
  vehicleId,
  registration_number,
  oem,
  vehicle_type,
  activeReportSection,
}) => {
  const [imperfectParts, setImperfectParts] = useState([]);
  const [fixedParts, setFixedParts] = useState([]);
  const [perfectParts, setPerfectParts] = useState([]);
  const [partsImages, setPartsImages] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    const latestKey = reportData?.fieldValue?.at(-1);
    const rawData = reportData?.childObjects?.[latestKey];

    if (rawData && bottomSheetVisible) {
      setImperfectParts(
        findFieldFromFetchedData(rawData?.fields, "imperfectParts")
          ?.childObjects || {},
      );
      setFixedParts(
        findFieldFromFetchedData(rawData?.fields, "refurbishedParts")
          ?.childObjects || {},
      );
      setPerfectParts(
        findFieldFromFetchedData(rawData?.fields, "perfectParts")
          ?.childObjects || {},
      );
    }
  }, [reportData, bottomSheetVisible]);

  const handleSearchFilter = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value?.length > 3) handleReportSearchEvent(value);
  };

  const handleResetInput = () => {
    setSearchValue("");
  };

  const filterParts = (partsObj) => {
    if (!searchValue) return Object.values(partsObj);
    return Object.values(partsObj).filter((part) => {
      const name =
        findFieldFromFetchedData(part?.fields, "name")?.fieldValue || "";
      const condition =
        findFieldFromFetchedData(part?.fields, "condition")?.fieldValue || "";
      const search = searchValue.toLowerCase();

      return (
        name.toLowerCase().includes(search) ||
        condition.toLowerCase().includes(search)
      );
    });
  };

  const items = useMemo(() => {
    const filteredImperfect = filterParts(imperfectParts);
    const filteredFixed = filterParts(fixedParts);
    const filteredPerfect = filterParts(perfectParts);

    return [
      filteredImperfect.length > 0 && {
        key: "1",
        label: (
          <CollapseHeading
            icon={imperfection_icon}
            title={t("VEHICLE_DETAILS.INSPECTION_REPORT.IMPERFECT_PARTS.TITLE")}
            count={filteredImperfect.length}
            countBgColor={"#FFF6E9"}
            countColor={"#CC7A00"}
          />
        ),
        children: (
          <div className="report_view_card_container">
            {filteredImperfect.map((part, idx) => (
              <ReportViewCard
                key={idx}
                partsData={part}
                vehicleId={vehicleId}
                partsImages={partsImages}
                setPartsImages={setPartsImages}
              />
            ))}
          </div>
        ),
      },
      filteredFixed.length > 0 && {
        key: "2",
        label: (
          <CollapseHeading
            icon={fixed_parts_icon}
            title={t("VEHICLE_DETAILS.INSPECTION_REPORT.FIXED_PARTS.TITLE")}
            count={filteredFixed.length}
            countBgColor={"#F7F1FF"}
            countColor={"#7225F5"}
          />
        ),
        children: (
          <div className="report_view_card_container">
            {filteredFixed.map((part, idx) => (
              <ReportViewCard
                key={idx}
                partsData={part}
                vehicleId={vehicleId}
                partsImages={partsImages}
                setPartsImages={setPartsImages}
              />
            ))}
          </div>
        ),
      },
      filteredPerfect.length > 0 && {
        key: "3",
        label: (
          <CollapseHeading
            icon={perfect_condition_icon}
            title={t(
              "VEHICLE_DETAILS.INSPECTION_REPORT.PERFECT_CONDITION.TITLE",
            )}
            count={filteredPerfect.length}
            countBgColor={"#E7F3F1"}
            countColor={"#157B6A"}
          />
        ),
        children: (
          <div className="report_view_card_container">
            {filteredPerfect.map((part, idx) => (
              <ReportViewCard
                key={idx}
                partsData={part}
                vehicleId={vehicleId}
                partsImages={partsImages}
                setPartsImages={setPartsImages}
              />
            ))}
          </div>
        ),
      },
    ].filter(Boolean);
  }, [
    imperfectParts,
    fixedParts,
    perfectParts,
    searchValue,
    partsImages,
    vehicleId,
  ]);

  const getSearchResultsCount = (
    filteredImperfect,
    filteredFixed,
    filteredPerfect,
  ) => {
    return (
      filteredImperfect.length + filteredFixed.length + filteredPerfect.length
    );
  };

  const handleReportSearchEvent = (search_string) => {
    const eventBody = {
      flowContext: `BUY_INSPECTION_REPORT_SEARCH`,
      action: CLICK,
      source_page: window.location.pathname,
      vehicleId,
      vehicle_type,
      registration_number,
      oem_name: oem,
      search_string,
    };
    sendEvent(eventBody);
  };

  return (
    <Modal
      open={bottomSheetVisible}
      onCancel={closeBottomSheet}
      centered
      width={600}
      footer={null}
      zIndex={1100}
      className="custom_report_modal"
      styles={{
        body: {
          padding: "0px",
          paddingBottom: "16px",
          maxHeight: "70vh",
          overflowY: "auto",
        },
        content: {
          borderRadius: "16px",
          overflow: "hidden",
        },
      }}
      title={t("VEHICLE_DETAILS.INSPECTION_REPORT.TITLE")}
      destroyOnClose={true}
    >
      {/* Search Field */}
      <div
        className="px-3 pt-3"
        style={{
          gap: "8px",
          paddingBottom: "8px",
          position: "relative",
          height: "60px",
        }}
      >
        <IoIosSearch
          className="position-absolute fs-5"
          style={{ top: "45%", left: "5%", color: "#666666" }}
        />
        <input
          className="form-control rounded-pill ps-5 bg-light"
          type="search"
          placeholder="Search for keywords"
          value={searchValue}
          onChange={handleSearchFilter}
          style={{ height: "40px", border: "1px solid #EAEAEA" }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.stopPropagation();
            }
          }}
        />
        {searchValue?.length > 0 && (
          <RxCross2
            className="position-absolute fs-5"
            onClick={handleResetInput}
            style={{
              top: "45%",
              right: "6%",
              color: "#666666",
              cursor: "pointer",
            }}
          />
        )}
      </div>

      {/* Search Result Count */}
      {searchValue && (
        <div className="px-3 py-2 text-muted" style={{ fontSize: "14px" }}>
          Showing{" "}
          <strong className="text-dark">
            {getSearchResultsCount(
              filterParts(imperfectParts),
              filterParts(fixedParts),
              filterParts(perfectParts),
            )}
          </strong>{" "}
          results for “{searchValue}”
        </div>
      )}

      {/* Collapse Section */}
      <div className="px-2">
        <Collapse
          ghost
          items={items}
          collapsible="header"
          expandIconPosition="end"
          style={{ fontSize: "16px", lineHeight: "24px" }}
          className="custom-collapse mt-2"
          defaultActiveKey={activeReportSection}
          expandIcon={({ isActive }) => (
            <div className="collapse_custom_icon d-flex align-items-center h-100">
              <IoIosArrowDown
                className={`fs-5 text-muted ${isActive ? "rotate-icon" : ""}`}
                style={{
                  transition: "transform 0.3s ease",
                  transform: isActive ? "rotate(-180deg)" : "rotate(0deg)",
                }}
              />
            </div>
          )}
        />
      </div>
    </Modal>
  );
};

export default VehicleReportModalV2;

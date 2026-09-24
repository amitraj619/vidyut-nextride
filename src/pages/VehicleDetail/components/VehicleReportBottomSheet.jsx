import { Collapse, Drawer } from "antd";
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
import { isMobileDevice } from "../../../utils/deviceCheck";
import { sendEvent } from "../../../services/analytics-service";
import { CLICK } from "../../../services/constants";

const CollapseHeading = ({ icon, title, count, countBgColor, countColor }) => {
  return (
    <div className="report_collapse_heading">
      {icon}
      <div className="collapse_title">{title}</div>
      <span
        className="collapse_count"
        style={{ backgroundColor: countBgColor, color: countColor }}
      >
        {count}
      </span>
    </div>
  );
};

const VehicleReportBottomSheet = ({
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
          ?.childObjects || {}
      );
      setFixedParts(
        findFieldFromFetchedData(rawData?.fields, "refurbishedParts")
          ?.childObjects || {}
      );
      setPerfectParts(
        findFieldFromFetchedData(rawData?.fields, "perfectParts")
          ?.childObjects || {}
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
              "VEHICLE_DETAILS.INSPECTION_REPORT.PERFECT_CONDITION.TITLE"
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
    filteredPerfect
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
    <Drawer
      open={bottomSheetVisible}
      onClose={closeBottomSheet}
      placement="bottom"
      height="90%"
      className="custom_report_bottom_sheet"
      styles={{
        body: {
          padding: "0px",
          paddingBottom: "16px",
        },
        content: {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          width: isMobileDevice() ? "100%" : "400px",
          justifySelf: "center",
        },
        mask: {
          width: isMobileDevice() ? "100%" : "400px",
          justifySelf: "center",
        },
      }}
      title={t("VEHICLE_DETAILS.INSPECTION_REPORT.TITLE")}
      destroyOnClose={true}
    >
      {/* search field */}
      <div
        className="px-2 pt-3"
        style={{
          gap: "8px",
          paddingBottom: "8px",
          position: "relative",
          height: "60px",
        }}
      >
        <IoIosSearch
          className="position-absolute fs-5"
          style={{ top: "45%", left: "4%", color: "#666666" }}
        />
        <input
          className="w-100 multi_select_search"
          type="search"
          placeholder="Search for keywords"
          value={searchValue}
          onChange={handleSearchFilter}
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
              right: "4%",
              color: "#666666",
              cursor: "pointer",
            }}
          />
        )}
      </div>

      {/* search result for key */}
      {searchValue && (
        <div className="showing_search_results">
          Showing{" "}
          {getSearchResultsCount(
            filterParts(imperfectParts),
            filterParts(fixedParts),
            filterParts(perfectParts)
          )}{" "}
          results for “{searchValue}”
        </div>
      )}

      <Collapse
        ghost
        items={items}
        collapsible="header"
        expandIconPosition="end"
        style={{ fontSize: "16px", lineHeight: "24px" }}
        className="custom-collapse"
        defaultActiveKey={activeReportSection}
        expandIcon={({ isActive }) => (
          <div className="collapse_custom_icon">
            <IoIosArrowDown
              className={`fs-5 ${isActive ? "rotate-icon" : ""}`}
            />
          </div>
        )}
      />
    </Drawer>
  );
};

export default VehicleReportBottomSheet;

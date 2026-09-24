import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { isFilterSelected } from "../../../utils/commonUtils";
import { CLICK } from "../../../services/constants";
import { sendEvent } from "../../../services/analytics-service";

const DesktopFilterPill = ({ filterName, removeSelectedFilter }) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="filter_pill active"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "#f1e9fe",
        color: "#7225f5",
        padding: "6px 14px",
        borderRadius: "999px",
        fontWeight: 600,
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid transparent",
        outline: "none",
      }}
      onClick={() => removeSelectedFilter(filterName)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#e6dbff";
        e.currentTarget.style.border = "1px solid #d6c7ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#f1e9fe";
        e.currentTarget.style.border = "1px solid transparent";
      }}
      aria-label={`Remove ${filterName} filter`}
    >
      <span className="filter_name" style={{ whiteSpace: "nowrap" }}>
        {t(`FILTER_LABELS.${filterName}`, filterName)}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          opacity: 0.8,
        }}
      >
        <RxCross2 />
      </span>
    </button>
  );
};

const DesktopSelectedFiltersBar = ({ useFilters, setIsFilterApplied }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    DEFAULT_FILTER,
    appliedFilters,
    setSelectedFilterDraft,
    setAppliedFilters,
    applyNewFilters,
  } = useFilters;

  const hasScrolledRef = useRef(false);

  const removeSelectedFilter = (key) => {
    const updatedDraft = {
      ...appliedFilters,
      [key]: DEFAULT_FILTER?.[key],
    };

    let paramsChanged = false;

    if (searchParams.get("type") === "brand" && key === "oem") {
      searchParams.delete("oem");
      paramsChanged = true;
    }

    if (key === "vehicleType" && searchParams.has("vehicleType")) {
      searchParams.delete("vehicleType");
      paramsChanged = true;
    }

    if (paramsChanged) {
      setSearchParams(searchParams, { replace: true });
    }

    setAppliedFilters(updatedDraft);
    setSelectedFilterDraft(updatedDraft);
    applyNewFilters(updatedDraft);

    if (setIsFilterApplied) {
      setIsFilterApplied(true);
    }
  };

  const handleFirstScroll = () => {
    if (!hasScrolledRef.current) {
      sendEvent({
        flowContext: `DESKTOP_QUICK_FILTER_ROW_SCROLL`,
        action: CLICK,
        source_page: window.location.pathname,
      });
      hasScrolledRef.current = true;
    }
  };

  const activeFilterKeys = Object.keys(DEFAULT_FILTER || {}).filter(
    (ele) =>
      ele !== "city" &&
      ele !== "sortBy" &&
      isFilterSelected(ele, appliedFilters),
  );

  if (activeFilterKeys.length === 0) return null;

  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <div
        className="selected_filter_bar_scroll hide-scrollbar"
        onScrollCapture={handleFirstScroll}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollBehavior: "smooth",
        }}
      >
        {activeFilterKeys.map((ele) => (
          <DesktopFilterPill
            key={`desktop-pill-${ele}`}
            filterName={ele}
            removeSelectedFilter={removeSelectedFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopSelectedFiltersBar;

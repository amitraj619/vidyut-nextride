import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../SCSS/style.scss";
import { isFilterSelected } from "../../../utils/commonUtils";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { CLICK } from "../../../services/constants";
import { sendEvent } from "../../../services/analytics-service";

const FilterPills = ({
  filterName,
  isFilterApplied = false,
  removeSelectedFilter,
  openFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`filter_pill ${isFilterApplied && "active"}`}>
      <div className="filter_name" onClick={openFilter}>
        {t(`FILTER_LABELS.${filterName}`, filterName)}
      </div>{" "}
      <div className="icon">
        {isFilterApplied ? (
          <RxCross2 onClick={() => removeSelectedFilter(filterName)} />
        ) : (
          <IoIosArrowDown onClick={openFilter} />
        )}{" "}
      </div>
    </div>
  );
};

const SelectedFiltersBar = ({
  openFilterBottomSheet,
  useFilters,
  setIsFilterApplied,
  handleFilterClickEventCall,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    DEFAULT_FILTER,
    appliedFilters,
    setActiveTabKey,
    setSelectedFilterDraft,
    setAppliedFilters,
    applyNewFilters,
  } = useFilters;

  const hasScrolledRef = useRef(false);

  const removeSelectedFilter = (key) => {
    setAppliedFilters((prev) => {
      const updatedDraft = {
        ...prev,
        [key]: DEFAULT_FILTER?.[key],
      };

      if (searchParams.get("type") === "brand" && key === "oem") {
        searchParams.delete("oem");
        setSearchParams(searchParams, { replace: true });
      }

      setSelectedFilterDraft(updatedDraft);
      applyNewFilters(updatedDraft); // Call inside update
      setIsFilterApplied(true);
      return updatedDraft;
    });
  };

  const openFilter = (ind) => {
    setActiveTabKey(String(ind + 1));
    handleFilterClickEventCall();
    openFilterBottomSheet();
  };

  const handleFirstScroll = (e) => {
    if (!hasScrolledRef.current) {
      const eventBody = {
        flowContext: `QUICK_FILTER_ROW_SCROLL`,
        action: CLICK,
        source_page: window.location.pathname,
      };
      sendEvent(eventBody);
      hasScrolledRef.current = true;
    }
  };

  return (
    <div className="selected_filter_bar d-flex">
      <div
        className="selected_filter_bar_scroll"
        onScrollCapture={handleFirstScroll}
      >
        {Object.keys(DEFAULT_FILTER)?.map((ele, ind) => (
          <div key={ele}>
            {ele !== "city" && ele !== "sortBy" && (
              <FilterPills
                key={`pills-${ele}`}
                filterName={ele}
                isFilterApplied={isFilterSelected(ele, appliedFilters)}
                removeSelectedFilter={removeSelectedFilter}
                openFilter={() => openFilter(ind)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedFiltersBar;

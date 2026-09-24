import { useEffect } from "react";
import { filter_icon, sort_icon } from "../../../assets/SVGIcons/CommonIcons";
import { getAppliedFiltersCount } from "../../../utils/commonUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const BottomActionBar = ({
  handleFilterBottomSheetVisible,
  useFilters,
  handleFilterClickEventCall,
  handleSortFilterClickEventCall,
}) => {
  const { setActiveTabKey, appliedFilters } = useFilters;
  const [filterCount, setFilterCount] = useState(0);
  const { t } = useTranslation();

  const handleFilterOpen = (key) => {
    setActiveTabKey(key);
    
    key === "1"
      ? handleSortFilterClickEventCall()
      : handleFilterClickEventCall();

    handleFilterBottomSheetVisible(true);
  };

  useEffect(() => {
    setFilterCount(getAppliedFiltersCount(appliedFilters));
  }, [appliedFilters]);

  return (
    <div className="bottom_action_bar_con border-top">
      <div className="bottom_action_btn" onClick={() => handleFilterOpen("2")}>
        {filter_icon} {t("VEHICLES_LISTING.FILTERS")}{" "}
        {filterCount ? <span className="filter_count">{filterCount}</span> : ""}
      </div>
      <div
        className="bottom_action_btn border-start"
        onClick={() => handleFilterOpen("1")}
      >
        {" "}
        {sort_icon} {t("VEHICLES_LISTING.SORT")}
      </div>
    </div>
  );
};

export default BottomActionBar;

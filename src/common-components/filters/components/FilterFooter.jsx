import { useEffect, useState } from "react";
import { CLICK, DEFAULT_FILTER } from "../../../services/constants";
import { shallowCompare } from "../../../utils/commonUtils";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";
import { useSearchParams } from "react-router-dom";

const FilterFooter = ({ closeBottomSheet, useFilters }) => {
  const { resetFilters, selectedFilterDraft, applyNewFilters, appliedFilters } =
    useFilters;
  const [isClearBtnDisabled, setIsClearBtnDisabled] = useState(true);
  const [isApplyBtnDisabled, setIsApplyBtnDisabled] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation();

  const handleClearFilterApplyClickEventCall = () => {
    const eventBody = {
      flowContext: `BUY_FILTER_CLEAR_ALL`,
      source_page: window.location.pathname,
      action: CLICK,
      filters_json: appliedFilters,
    };
    sendEvent(eventBody);
  };

  const handleSubmit = () => {
    applyNewFilters();
    if (searchParams.get("type") === "brand") {
      searchParams.set("oem", selectedFilterDraft?.oem);
      setSearchParams(searchParams, { replace: true });
    }
    closeBottomSheet();
  };

  const handleClear = () => {
    handleClearFilterApplyClickEventCall();
    resetFilters();
  };

  useEffect(() => {
    const { city: _, ...defaultFilterWithoutCity } = DEFAULT_FILTER;
    const { city: __, ...selectedDraftWithoutCity } = selectedFilterDraft;
    const { city: ___, ...appliedFilterWithoutCity } = appliedFilters;

    const isCloseBtnSame = shallowCompare(
      defaultFilterWithoutCity,
      selectedDraftWithoutCity,
    );
    const isApplyBtnSame = shallowCompare(
      selectedDraftWithoutCity,
      appliedFilterWithoutCity,
    );

    setIsClearBtnDisabled(isCloseBtnSame);
    setIsApplyBtnDisabled(isApplyBtnSame);
  }, [selectedFilterDraft, appliedFilters]);

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
      <button
        className="btn no_background_btn py-2 px-3 flex-grow-1"
        onClick={handleClear}
        disabled={isClearBtnDisabled}
      >
        {t("VEHICLES_LISTING.CLEAR_ALL")}
      </button>
      <button
        className="btn primary_btn py-2 px-3 flex-grow-1"
        disabled={isApplyBtnDisabled}
        onClick={handleSubmit}
      >
        {t("VEHICLES_LISTING.APPLY")}
      </button>
    </div>
  );
};

export default FilterFooter;

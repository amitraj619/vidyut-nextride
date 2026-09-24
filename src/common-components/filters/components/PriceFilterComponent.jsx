import { Slider } from "antd";
import { useEffect, useState } from "react";
import "../../SCSS/style.scss";
import { MAX_PRICE, MIN_PRICE } from "../../../services/constants";
import { useTranslation } from "react-i18next";
import { getFormattedCurrency } from "../../../utils/commonUtils";

const PriceFilterComponent = ({ bottomSheetVisible, useFilters }) => {
  const {
    selectedFilterDraft,
    setSelectedFilterDraft,
    activeTabKey,
    isFilterOpen,
  } = useFilters;

  const [showTooltip, setShowTooltip] = useState(true);
  const { t } = useTranslation();

  const handlePriceChange = (value) => {
    const [min, max] = value;
    setSelectedFilterDraft((prev) => ({
      ...prev,
      targetSellingPrice: {
        lowerBound: min,
        upperBound: max,
      },
    }));
  };

  useEffect(() => {
    if (activeTabKey === "5" && isFilterOpen && bottomSheetVisible) {
      setShowTooltip(false);
      const timeout = setTimeout(() => setShowTooltip(true), 120); // Re-enable after a short delay
      return () => clearTimeout(timeout);
    } else {
      setShowTooltip(false);
    }
  }, [activeTabKey, isFilterOpen, bottomSheetVisible]);

  return (
    <div className="range_filter_con">
      <div className="range_filter_range_com">
        <div className="range_range_label">
          {t("VEHICLES_LISTING.PRICE_RANGE")}
        </div>
        <div className="range_range_value">
          ₹
          {getFormattedCurrency(
            selectedFilterDraft?.targetSellingPrice?.lowerBound || MIN_PRICE
          )}{" "}
          - ₹
          {getFormattedCurrency(
            selectedFilterDraft?.targetSellingPrice?.upperBound || MAX_PRICE
          )}
        </div>
      </div>

      <div className="range_slider_filter_com">
        <div className="slider_label">
          <div>{t("VEHICLES_LISTING.MAX")}</div>
          <div>{t("VEHICLES_LISTING.MIN")}</div>
        </div>

        <Slider
          vertical
          range
          className="custom_range_slider"
          min={MIN_PRICE}
          max={MAX_PRICE}
          tooltip={{
            open: showTooltip,
            formatter: (val) => `₹${getFormattedCurrency(val)}`,
          }}
          value={[
            selectedFilterDraft?.targetSellingPrice?.lowerBound || MIN_PRICE,
            selectedFilterDraft?.targetSellingPrice?.upperBound || MAX_PRICE,
          ]}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default PriceFilterComponent;

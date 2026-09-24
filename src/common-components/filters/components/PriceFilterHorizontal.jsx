import { Slider } from "antd";
import { useEffect, useState } from "react";
import "../../SCSS/style.scss";
import { MAX_PRICE, MIN_PRICE } from "../../../services/constants";
import { useTranslation } from "react-i18next";
import { getFormattedCurrency } from "../../../utils/commonUtils";

const PriceFilterHorizontal = ({ bottomSheetVisible, useFilters }) => {
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
      const timeout = setTimeout(() => setShowTooltip(true), 120);
      return () => clearTimeout(timeout);
    } else {
      setShowTooltip(false);
    }
  }, [activeTabKey, isFilterOpen, bottomSheetVisible]);

  const minValue =
    selectedFilterDraft?.targetSellingPrice?.lowerBound || MIN_PRICE;
  const maxValue =
    selectedFilterDraft?.targetSellingPrice?.upperBound || MAX_PRICE;

  return (
    <div className="price_filter_horizontal">
      <div className="price_filter_header">
        <div className="label">{t("VEHICLES_LISTING.PRICE_RANGE")}</div>

        <div className="value">
          ₹{getFormattedCurrency(minValue)} - ₹{getFormattedCurrency(maxValue)}
        </div>
      </div>

      <div className="slider_wrapper">
        <Slider
          range
          min={MIN_PRICE}
          max={MAX_PRICE}
          className="custom_range_slider horizontal"
          tooltip={{
            open: showTooltip,
            formatter: (val) => `₹${getFormattedCurrency(val)}`,
          }}
          value={[minValue, maxValue]}
          onChange={handlePriceChange}
        />

        <div className="slider_labels">
          <span>{t("VEHICLES_LISTING.MIN")}</span>
          <span>{t("VEHICLES_LISTING.MAX")}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterHorizontal;

import { Slider } from "antd";
import { useEffect, useState } from "react";
import "../../SCSS/style.scss";
import { MAX_KMS, MIN_KMS } from "../../../services/constants";
import { useTranslation } from "react-i18next";
import { getFormattedCurrency } from "../../../utils/commonUtils";

const OdometerFilterHorizontal = ({
  bottomSheetVisible,
  useFilters,
  layout = "horizontal",
}) => {
  const {
    selectedFilterDraft,
    setSelectedFilterDraft,
    activeTabKey,
    isFilterOpen,
  } = useFilters;

  const [showTooltip, setShowTooltip] = useState(true);
  const { t } = useTranslation();

  const handleOdometerChange = (value) => {
    const [min, max] = value;
    setSelectedFilterDraft((prev) => ({
      ...prev,
      currentOdometer: {
        lowerBound: min,
        upperBound: max,
      },
    }));
  };

  useEffect(() => {
    if (activeTabKey === "6" && isFilterOpen && bottomSheetVisible) {
      setShowTooltip(false);
      const timeout = setTimeout(() => setShowTooltip(true), 120);
      return () => clearTimeout(timeout);
    } else {
      setShowTooltip(false);
    }
  }, [activeTabKey, isFilterOpen, bottomSheetVisible]);

  const minValue = selectedFilterDraft?.currentOdometer?.lowerBound || MIN_KMS;
  const maxValue = selectedFilterDraft?.currentOdometer?.upperBound || MAX_KMS;

  return (
    <div className={`odometer_filter ${layout}`}>
      <div className="odometer_filter_header">
        <div className="label">{t("VEHICLES_LISTING.KMS_DRIVEN")}</div>

        <div className="value">
          {getFormattedCurrency(minValue)} {t("VEHICLES_LISTING.KM")} -{" "}
          {getFormattedCurrency(maxValue)} {t("VEHICLES_LISTING.KM")}
        </div>
      </div>

      <div className="slider_wrapper">
        <Slider
          range
          vertical={layout === "vertical"}
          min={MIN_KMS}
          max={MAX_KMS}
          className={`custom_range_slider ${
            layout === "horizontal" ? "horizontal" : ""
          }`}
          tooltip={{
            open: showTooltip,
            formatter: (val) =>
              `${getFormattedCurrency(val)} ${t("VEHICLES_LISTING.KM")}`,
          }}
          value={[minValue, maxValue]}
          onChange={handleOdometerChange}
        />

        {layout === "horizontal" && (
          <div className="slider_labels">
            <span>{t("VEHICLES_LISTING.MIN")}</span>
            <span>{t("VEHICLES_LISTING.MAX")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OdometerFilterHorizontal;

import React from "react";
import { useTranslation } from "react-i18next";
import SortFilterComponent from "../../../common-components/filters/components/SortFilterComponent";
import VehicleTypeFilterComponent from "../../../common-components/filters/components/VehicleTypeFilterComponent";
import BrandFilterComponent from "../../../common-components/filters/components/BrandFilterComponent";
import PriceFilterComponent from "../../../common-components/filters/components/PriceFilterComponent";
import OdometerFilterComponent from "../../../common-components/filters/components/OdometerFilterComponent";
import RegYearFilterComponent from "../../../common-components/filters/components/RegYearFilterComponent";
import FilterFooter from "../../../common-components/filters/components/FilterFooter";
import { isFilterSelected } from "../../../utils/commonUtils";
import PriceFilterHorizontal from "../../../common-components/filters/components/PriceFilterHorizontal";
import OdometerFilterHorizontal from "../../../common-components/filters/components/OdometerFilterHorizontal";

const DesktopSidebarFilter = ({
  useFilters,
  schema,
  setIsFilterApplied,
  setIsSortFilterModified,
}) => {
  const { t } = useTranslation();
  const { appliedFilters, selectedFilterDraft } = useFilters;

  const filtersList = [
    {
      label: t("VEHICLES_LISTING.SORT"),
      component: (
        <SortFilterComponent schema={schema} useFilters={useFilters} />
      ),
      key: "sortBy",
    },
    {
      label: t("VEHICLES_LISTING.VEHICLE_TYPE"),
      component: (
        <VehicleTypeFilterComponent schema={schema} useFilters={useFilters} />
      ),
      key: "vehicleType",
    },
    {
      label: t("VEHICLES_LISTING.BRAND"),
      component: (
        <BrandFilterComponent schema={schema} useFilters={useFilters} />
      ),
      key: "oem",
    },
    {
      label: t("VEHICLES_LISTING.PRICE") || "Budget",
      component: (
        <PriceFilterHorizontal
          schema={schema}
          bottomSheetVisible={true}
          useFilters={useFilters}
          layout="horizontal"
        />
      ),
      key: "targetSellingPrice",
    },
    {
      label: t("VEHICLES_LISTING.KMS_DRIVEN"),
      component: (
        <OdometerFilterHorizontal
          schema={schema}
          bottomSheetVisible={true}
          useFilters={useFilters}
          layout="horizontal"
        />
      ),
      key: "currentOdometer",
    },
    {
      label: t("VEHICLES_LISTING.REG_YEAR") || "Model Year",
      component: (
        <RegYearFilterComponent
          schema={schema}
          bottomSheetVisible={true}
          useFilters={useFilters}
        />
      ),
      key: "registrationYear",
    },
  ];

  const handleApplyFilters = () => {
    const isSortModified =
      JSON.stringify(selectedFilterDraft?.sortBy) !==
      JSON.stringify(appliedFilters?.sortBy);

    if (isSortModified) {
      setIsSortFilterModified(true);
    }

    setIsFilterApplied(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="desktop-sidebar-filter d-flex flex-column"
      style={{ height: "100%", position: "relative" }}
    >
      <div
        className="filter-sidebar-header pb-3 mb-3"
        style={{
          borderBottom: "1px solid #eaeaea",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <FilterFooter
          closeBottomSheet={handleApplyFilters}
          useFilters={useFilters}
        />
      </div>

      <div
        className="filter-sections flex-grow-1 pe-2"
        style={{ overflowY: "visible" }}
      >
        {filtersList.map((filter, index) => (
          <div
            key={filter.key || index}
            className="filter-group mb-4 pb-3"
            style={{
              borderBottom:
                index !== filtersList.length - 1 ? "1px solid #eaeaea" : "none",
            }}
          >
            <div className="d-flex align-items-center mb-3">
              <h6
                className="m-0 fw-bold"
                style={{ fontSize: "15px", color: "#333" }}
              >
                {filter.label}
              </h6>

              {isFilterSelected(filter.key, selectedFilterDraft) && (
                <div
                  className="ms-2"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#6c5ce7",
                  }}
                />
              )}
            </div>

            <div className="filter-component-wrapper">{filter.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebarFilter;

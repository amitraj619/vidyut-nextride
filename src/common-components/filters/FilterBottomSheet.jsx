import { Drawer, Tabs } from "antd";
import "./SCSS/style.scss";
import BrandFilterComponent from "./components/BrandFilterComponent";
import PriceFilterComponent from "./components/PriceFilterComponent";
import FilterFooter from "./components/FilterFooter";
import SortFilterComponent from "./components/SortFilterComponent";
import { useContext, useEffect } from "react";
import { ProjectSchemaContext } from "../../context/ProjectSchemaProvider";
import VehicleTypeFilterComponent from "./components/VehicleTypeFilterComponent";
import { isFilterSelected } from "../../utils/commonUtils";
import { useTranslation } from "react-i18next";
import OdometerFilterComponent from "./components/OdometerFilterComponent";
import RegYearFilterComponent from "./components/RegYearFilterComponent";
import { CLICK } from "../../services/constants";
import { sendEvent } from "../../services/analytics-service";
import { isMobileDevice } from "../../utils/deviceCheck";

const FilterBottomSheet = ({
  bottomSheetVisible,
  closeBottomSheet,
  closeBottomSheetAfterFilterApplied,
  useFilters,
}) => {
  const { schema } = useContext(ProjectSchemaContext);
  const {
    activeTabKey,
    setActiveTabKey,
    appliedFilters,
    setSelectedFilterDraft,
    selectedFilterDraft,
    setIsFilterOpen,
  } = useFilters;

  const { t } = useTranslation();

  const filtersList = [
    {
      label: t("VEHICLES_LISTING.SORT"),
      component: (
        <SortFilterComponent schema={schema} useFilters={useFilters} />
      ),
      key: "sortBy",
    },
    {
      label: t("VEHICLES_LISTING.BRAND"),
      component: (
        <BrandFilterComponent schema={schema} useFilters={useFilters} />
      ),
      key: "oem",
    },
    {
      label: t("VEHICLES_LISTING.REG_YEAR"),
      component: (
        <RegYearFilterComponent
          schema={schema}
          bottomSheetVisible={bottomSheetVisible}
          useFilters={useFilters}
        />
      ),
      key: "registrationYear",
    },
    {
      label: t("VEHICLES_LISTING.VEHICLE_TYPE"),
      component: (
        <VehicleTypeFilterComponent schema={schema} useFilters={useFilters} />
      ),
      key: "vehicleType",
    },
    {
      label: t("VEHICLES_LISTING.PRICE"),
      component: (
        <PriceFilterComponent
          schema={schema}
          bottomSheetVisible={bottomSheetVisible}
          useFilters={useFilters}
        />
      ),
      key: "targetSellingPrice",
    },
    {
      label: t("VEHICLES_LISTING.KMS_DRIVEN"),
      component: (
        <OdometerFilterComponent
          schema={schema}
          bottomSheetVisible={bottomSheetVisible}
          useFilters={useFilters}
        />
      ),
      key: "currentOdometer",
    },
  ];

  const handleAfterOpenChanges = () => {
    setIsFilterOpen(false);
    setIsFilterOpen(true);
  };

  const handleTabChange = (key) => {
    const eventBody = {
      flowContext: `BUY_FILTER_TAB_SELECT`,
      source_page: window.location.pathname,
      action: CLICK,
      filter_category: filtersList?.[key - 1]?.label,
    };
    sendEvent(eventBody);

    setActiveTabKey(key);
  };

  useEffect(() => {
    if (
      JSON.stringify(appliedFilters) !== JSON.stringify(selectedFilterDraft) &&
      bottomSheetVisible
    ) {
      setSelectedFilterDraft(appliedFilters);
    }
  }, [bottomSheetVisible]);

  useEffect(() => {
    const handlePopState = () => {
      closeBottomSheet();
    };

    if (bottomSheetVisible) {
      window.history.pushState({ filterDrawerOpen: true }, "");
      window.addEventListener("popstate", handlePopState);

      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "";

      if (bottomSheetVisible && window.history.state?.filterDrawerOpen) {
        window.history.back();
      }
    };
  }, [bottomSheetVisible]);

  return (
    <Drawer
      open={bottomSheetVisible}
      onClose={closeBottomSheet}
      afterOpenChange={handleAfterOpenChanges}
      placement="bottom"
      height={window.innerHeight - 64}
      className="custom_filter_bottom_sheet"
      styles={{
        body: {
          padding: "0px",
        },
        content: {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          width: isMobileDevice() ? "100%" : "400px",
          justifySelf: "center",
        },
        footer: {
          height: "80px",
          display: "flex",
          alignItems: "center",
        },
        mask: {
          width: isMobileDevice() ? "100%" : "400px",
          justifySelf: "center",
        },
      }}
      title={t("VEHICLES_LISTING.ALL_FILTERS")}
      destroyOnClose={true}
      footer={
        <FilterFooter
          closeBottomSheet={closeBottomSheetAfterFilterApplied}
          useFilters={useFilters}
        />
      }
    >
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => handleTabChange(key)}
        tabPosition="left"
        style={{ height: "100%" }}
        tabBarStyle={{
          fontSize: "14px",
          fontWeight: 500,
        }}
        className="custom_tabs"
        items={filtersList.map((ele, ind) => ({
          label: (
            <div className="filter_tab_label">
              {ele.label}{" "}
              <div
                className={`applied_filter_dot ${
                  !isFilterSelected(ele?.key, selectedFilterDraft) && "d-none"
                }`}
              ></div>
            </div>
          ),
          key: String(ind + 1),
          children: ele.component,
        }))}
      />
    </Drawer>
  );
};

export default FilterBottomSheet;

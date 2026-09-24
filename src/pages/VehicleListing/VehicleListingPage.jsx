import { useEffect, useState } from "react";
import CustomerReviews from "../../common-components/CustomerReviews";
import FAQSection from "../../common-components/FAQSection";
import Footer from "../../common-components/Footer";
import Header from "../../common-components/Header";
import PageWrapper from "../../common-components/PageWrapper";
import BottomActionBar from "./components/BottomActionBar";
import "./SCSS/style.scss";
import FilterBottomSheet from "../../common-components/filters/FilterBottomSheet";
import VehiclesList from "./components/VehiclesList";
import SelectedFiltersBar from "./components/SelectedFiltersBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDynamicFilter } from "../../customHooks/useDynamicFilter";
import { useTranslation } from "react-i18next";
import { CLICK, DEFAULT_FILTER, VIEW } from "../../services/constants";
import { sendEvent } from "../../services/analytics-service";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import { brandSeo, seoData } from "../../utils/dynamicSEOData";
import SEO from "../../common-components/SEO";

const VehicleListingPage = () => {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isSortFilterModified, setIsSortFilterModified] = useState(false);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const oem = searchParams.get("oem");
  const city = searchParams.get("city");
  const { t } = useTranslation();

  // Dynamically choose the correct filter
  const filterContext = useDynamicFilter(type);
  const [filterBottomSheetVisible, setFilterBottomSheetVisible] =
    useState(false);
  const {
    appliedFilters,
    setSelectedFilterDraft,
    selectedFilterDraft,
    vehicleList,
    loading,
    applyNewFilters,
  } = filterContext;

  useScrollToTop([], "instant");

  const location = useLocation();

  const handleFilterClickEventCall = () => {
    const eventBody = {
      flowContext: `BUY_FILTER_CTA_CLICK`,
      source_page: window.location.pathname,
      action: CLICK,
      filters_json: appliedFilters,
    };
    sendEvent(eventBody);
  };

  const handleSortFilterClickEventCall = () => {
    const eventBody = {
      flowContext: `BUY_SORT_PANEL_OPEN`,
      action: CLICK,
      source_page: window.location.pathname,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(appliedFilters?.sortBy),
    };
    sendEvent(eventBody);
  };

  const handleFilterApplyClickEventCall = () => {
    const eventBody = {
      flowContext: `BUY_FILTER_APPLY`,
      action: CLICK,
      source_page: window.location.pathname,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(appliedFilters?.sortBy),
      results_count: vehicleList?.length ?? 0,
    };
    sendEvent(eventBody);
  };

  const handleSortFilterModifiedEventCall = () => {
    const eventBody = {
      flowContext: `BUY_SORT_APPLY`,
      action: CLICK,
      source_page: window.location.pathname,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(appliedFilters?.sortBy),
      results_count: vehicleList?.length ?? 0,
    };
    sendEvent(eventBody);
  };

  const handleFilterBottomSheetVisible = (value) => {
    setFilterBottomSheetVisible(value);
  };

  const handleCloseFilterBottomSheet = () => {
    handleFilterBottomSheetVisible(false);
    setTimeout(() => {
      setSelectedFilterDraft(appliedFilters);
    }, 300);
  };

  const handleCloseFilterBottomSheetAfterApply = () => {
    const isModified =
      JSON.stringify(selectedFilterDraft?.sortBy) !==
      JSON.stringify(appliedFilters?.sortBy);

    setIsFilterApplied(true);
    setIsSortFilterModified(isModified);
    handleCloseFilterBottomSheet();
  };

  // Default SEO data
  let currentSeoData = {
    ...seoData.ALL_EV_VEHICLES,
    link: `https://vidyutnextride.com${location.pathname}?city=${city}`,
  };

  // Check if it's a dynamic brand page
  if (type === "brand" && oem && brandSeo[oem]) {
    searchParams;
    currentSeoData = {
      ...brandSeo[oem],
      link: `https://vidyutnextride.com${
        location.pathname
      }?${searchParams.toString()}`,
    };
  }

  useEffect(() => {
    const eventBody = {
      flowContext: `BUY_LIST_PAGE_VIEW`,
      action: VIEW,
      source_page: window.location.pathname,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(appliedFilters?.sortBy),
      results_count: vehicleList?.length ?? 0,
    };
    sendEvent(eventBody);
  }, []);

  useEffect(() => {
    if (!loading && isFilterApplied) {
      setIsFilterApplied(false);
      handleFilterApplyClickEventCall();
    }

    if (!loading && isSortFilterModified) {
      setIsSortFilterModified(false);
      handleSortFilterModifiedEventCall();
    }
  }, [loading]);

  useEffect(() => {
    if (type === "brand" && oem) {
      setSelectedFilterDraft((prev) => {
        const updatedDraft = {
          ...DEFAULT_FILTER,
          city: prev.city ?? [],
          oem: oem?.split(","),
        };
        applyNewFilters(updatedDraft);
        return updatedDraft;
      });
    }
  }, []);

  return (
    <div className="vehicle_listing_page">
      <PageWrapper>
        <SEO data={currentSeoData} />
        <Header
          header_name={t("VEHICLES_LISTING.ALL_EVS")}
          show_whatsapp_icon
          whatsapp_icon_bottom_height="80px"
        />
        <SelectedFiltersBar
          openFilterBottomSheet={() => handleFilterBottomSheetVisible(true)}
          useFilters={filterContext}
          setIsFilterApplied={setIsFilterApplied}
          handleFilterClickEventCall={handleFilterClickEventCall}
        />
        <VehiclesList useFilters={filterContext} />
        <CustomerReviews />
        <FAQSection type="buy" />
        <Footer />
        <FilterBottomSheet
          bottomSheetVisible={filterBottomSheetVisible}
          closeBottomSheet={handleCloseFilterBottomSheet}
          closeBottomSheetAfterFilterApplied={
            handleCloseFilterBottomSheetAfterApply
          }
          useFilters={filterContext}
        />
        <BottomActionBar
          handleFilterBottomSheetVisible={handleFilterBottomSheetVisible}
          useFilters={filterContext}
          handleFilterClickEventCall={handleFilterClickEventCall}
          handleSortFilterClickEventCall={handleSortFilterClickEventCall}
        />
      </PageWrapper>
    </div>
  );
};

export default VehicleListingPage;

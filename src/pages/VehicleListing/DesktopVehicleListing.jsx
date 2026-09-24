import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  getEMIStartsValue,
  getFormattedCurrency,
  getRto,
  getShorthandCurrencyFormat,
} from "../../utils/commonUtils";
import {
  CLICK,
  DEFAULT_FILTER,
  VIEW,
  VehicleListing,
} from "../../services/constants";
import { sendEvent } from "../../services/analytics-service";
import VehicleCardV2 from "../../common-components/cards/VehicleCardV2";
import HeaderDesktop from "../../common-components/HeaderDesktop";
import { ProjectSchemaContext } from "../../context/ProjectSchemaProvider";
import { useDynamicFilter } from "../../customHooks/useDynamicFilter";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import DesktopSidebarFilter from "../Desktop/components/DesktopSidebarFilter";
import DesktopSelectedFiltersBar from "../Desktop/components/DesktopSelectedFiltersBar";
import VehicleCardV2Skeleton from "../../common-components/cards/VehicleCardV2Skeleton";
import SEO from "../../common-components/SEO";
import { brandSeo, seoData } from "../../utils/dynamicSEOData";
import FilterBottomSheet from "../../common-components/filters/FilterBottomSheet";
import Footer from "../../common-components/Footer";

const DesktopVehicleListing = () => {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterBottomSheetVisible, setFilterBottomSheetVisible] =
    useState(false);
  const [isSortFilterModified, setIsSortFilterModified] = useState(false);
  const hasLoggedPageView = useRef(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = searchParams.get("type");
  const oem = searchParams.get("oem");
  const city = searchParams.get("city");
  const vehicleTypeParam = searchParams.get("vehicleType");
  const [isUrlProcessing, setIsUrlProcessing] = useState(
    Boolean((type === "brand" && oem) || vehicleTypeParam),
  );

  const { schema } = useContext(ProjectSchemaContext);

  const { t } = useTranslation();

  const filterContext = useDynamicFilter(type);
  const {
    vehicleList,
    loading,
    isMoreData,
    fetchVehiclesData,
    appliedFilters,
    setSelectedFilterDraft,
    selectedFilterDraft,
    applyNewFilters,
    setAppliedFilters,
  } = filterContext;

  useScrollToTop([], "instant");

  let currentSeoData = {
    ...seoData.ALL_EV_VEHICLES,
    link: `https://vidyutnextride.com${location.pathname}?city=${city}`,
  };

  if (type === "brand" && oem && brandSeo[oem]) {
    currentSeoData = {
      ...brandSeo[oem],
      link: `https://vidyutnextride.com${location.pathname}?${searchParams.toString()}`,
    };
  }

  const observer = useRef();

  const lastVehicleElementRef = useCallback(
    (node) => {
      if (loading || !isMoreData) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading && isMoreData) {
            fetchVehiclesData(appliedFilters);
          }
        },
        {
          rootMargin: "300px",
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, isMoreData, appliedFilters, fetchVehiclesData],
  );

  // Mobile Filter Handlers
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

  // Analytics Handlers

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

  const handleFilterClickEventCall = () => {
    const eventBody = {
      flowContext: `BUY_FILTER_CTA_CLICK`,
      source_page: window.location.pathname,
      action: CLICK,
      filters_json: appliedFilters,
    };
    sendEvent(eventBody);
  };

  useEffect(() => {
    if (!loading) {
      if (isFilterApplied) {
        setIsFilterApplied(false);
        sendEvent({
          flowContext: `BUY_FILTER_APPLY`,
          action: CLICK,
          source_page: window.location.pathname,
          filters_json: appliedFilters,
          sort_option: JSON.stringify(appliedFilters?.sortBy),
          results_count: vehicleList?.length ?? 0,
        });
      }

      if (isSortFilterModified) {
        setIsSortFilterModified(false);
        sendEvent({
          flowContext: `BUY_SORT_APPLY`,
          action: CLICK,
          source_page: window.location.pathname,
          filters_json: appliedFilters,
          sort_option: JSON.stringify(appliedFilters?.sortBy),
          results_count: vehicleList?.length ?? 0,
        });
      }
    }
  }, [
    loading,
    isFilterApplied,
    isSortFilterModified,
    appliedFilters,
    vehicleList,
  ]);

  useEffect(() => {
    if (!loading && !isUrlProcessing && !hasLoggedPageView.current) {
      const eventBody = {
        flowContext: `BUY_LIST_PAGE_VIEW`,
        action: VIEW,
        source_page: window.location.pathname,
        filters_json: appliedFilters,
        sort_option: JSON.stringify(appliedFilters?.sortBy),
        results_count: vehicleList?.length ?? 0,
      };

      sendEvent(eventBody);
      hasLoggedPageView.current = true; // Mark as logged
    }
  }, [loading, isUrlProcessing, appliedFilters, vehicleList]);

  useEffect(() => {
    if ((type === "brand" && oem) || vehicleTypeParam) {
      const updatedDraft = {
        ...DEFAULT_FILTER,
        city: appliedFilters?.city ?? [],
      };

      if (type === "brand" && oem) {
        updatedDraft.oem = oem.split(",");
      }

      if (vehicleTypeParam) {
        updatedDraft.vehicleType = vehicleTypeParam.split(",");
      }

      setAppliedFilters(updatedDraft);
      setSelectedFilterDraft(updatedDraft);

      applyNewFilters(updatedDraft).then(() => {
        setIsUrlProcessing(false);
      });
    }
  }, []);

  const renderDesktopVehicleCard = (vehicle, index, isLastElement) => {
    const fields = vehicle?.fields || {};
    const getFieldValue = (key) =>
      findFieldFromFetchedData(fields, key)?.fieldValue;

    const oemStr = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "oem",
      getFieldValue("oem"),
    );
    const model = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "model",
      getFieldValue("model"),
    );
    const variant = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "variant",
      getFieldValue("variant"),
    );

    const odometer = getFieldValue("currentOdometer") || "";
    const targetSellingPrice = getFieldValue("targetSellingPrice");
    const vehicleRegNumber = getFieldValue("vehicleRegNumber");
    const thumbnail = getFieldValue("thumbnail");
    const vehicleId = getFieldValue("vehicleId");
    const chargingTime = getFieldValue("chargingTime");
    const vehicleType = getFieldValue("vehicleType");
    const rawOem = getFieldValue("oem");

    const formattedName = ` ${oemStr} ${model} ${variant}`.trim();

    const handleCheckAmountTrack = (destinationPage) => {
      sendEvent({
        flowContext: "BUY_VEHICLE_CHECK_AMOUNT_CLICKED",
        action: CLICK,
        source_page: window.location.pathname,
        filters_json: appliedFilters,
        sort_option: JSON.stringify(appliedFilters?.sortBy),
        card_position: index + 1, // 1-based index
        results_count: vehicleList?.length ?? 0,
        vehicleId: vehicleId,
        registration_number: vehicleRegNumber,
        oem_name: rawOem,
        vehicle_type: vehicleType,
        destination_page: destinationPage,
      });
    };

    const handleTestRideTrack = (destinationPage) => {
      sendEvent({
        flowContext: "BUY_VEHICLE_TEST_RIDE_CLICKED",
        action: CLICK,
        source_page: window.location.pathname,
        filters_json: appliedFilters,
        sort_option: JSON.stringify(appliedFilters?.sortBy),
        card_position: index + 1, // 1-based index
        results_count: vehicleList?.length ?? 0,
        vehicleId: vehicleId,
        registration_number: vehicleRegNumber,
        oem_name: rawOem,
        vehicle_type: vehicleType,
        destination_page: destinationPage,
      });
    };

    return (
      <article
        ref={isLastElement ? lastVehicleElementRef : null}
        className="col-12 col-md-6 col-xl-4"
        key={vehicle?.objectId || index}
      >
        <VehicleCardV2
          thumbnailIds={thumbnail}
          vehicle_name={formattedName}
          odometer={odometer}
          rto={getRto(vehicleRegNumber)}
          emi_price={getFormattedCurrency(
            getEMIStartsValue(targetSellingPrice),
          )}
          vehicle_price={getShorthandCurrencyFormat(targetSellingPrice)}
          navigate_url={`/buy-used-ev/${vehicle.objectId}/details`}
          vehicleId={vehicleId}
          chargeTime={chargingTime}
          model={model}
          vehicle_type={vehicleType}
          vehicleNo={vehicleRegNumber}
          oem={rawOem}
          onCheckAmountClick={handleCheckAmountTrack}
          onTestRideClick={handleTestRideTrack}
          cardStyle={{
            height: "100%",
            cursor: "pointer",
            border: "1px solid #eaeaea",
            borderRadius: "16px",
            padding: "16px",
            background: "#ffffff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
          }}
        />
      </article>
    );
  };

  const isInitialLoad = loading && (!vehicleList || vehicleList.length === 0);

  return (
    <main
      className="desktop-vehicle-listing"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SEO data={currentSeoData} />
      <HeaderDesktop
        is_root={true}
        show_location_btn={true}
        header_name={t("VEHICLES_LISTING.EXPLORE_VEHICLES", "Explore Vehicles")}
      />

      <section className="container-fluid px-lg-5 py-4 flex-grow-1">
        <header
          className="d-flex justify-content-between align-items-center mb-4"
          style={{
            background: "#ffffff",
            padding: "16px 24px",
            borderRadius: "16px",
            border: "1px solid #eaeaea",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              margin: 0,
              color: "#111827",
            }}
          >
            {t("VEHICLES_LISTING.VEHICLES_NEAR_YOU")}
          </h2>

          <button
            className="btn btn-outline-dark d-lg-none d-flex align-items-center"
            onClick={() => handleFilterBottomSheetVisible(true)}
            style={{
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              padding: "8px 20px",
            }}
            aria-label="Open filters and sort options"
          >
            {t("VEHICLES_LISTING.FILTERS_AND_SORT")}
          </button>
        </header>

        <div className="row">
          <aside className="col-lg-3 d-none d-lg-block">
            <div
              className="desktop-sidebar p-4 bg-white"
              style={{
                borderRadius: "16px",
                border: "1px solid #eaeaea",
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                top: "24px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="d-flex align-items-center mb-4"
                style={{
                  borderBottom: "1px solid #f3f4f6",
                  paddingBottom: "16px",
                  flexShrink: 0,
                }}
              >
                <h3
                  className="m-0"
                  style={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#1f2937",
                  }}
                >
                  {t("VEHICLES_LISTING.FILTERS")}
                </h3>
              </div>

              <DesktopSidebarFilter
                useFilters={filterContext}
                schema={schema}
                setIsFilterApplied={setIsFilterApplied}
                setIsSortFilterModified={setIsSortFilterModified}
              />
            </div>
          </aside>
          <section className="col-lg-9 col-12">
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #eaeaea",
                boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
              }}
            >
              <DesktopSelectedFiltersBar
                useFilters={filterContext}
                setIsFilterApplied={setIsFilterApplied}
                handleFilterClickEventCall={handleFilterClickEventCall}
              />

              <div className="row g-4">
                {isInitialLoad ? (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <div className="col-12 col-md-6 col-xl-4" key={index}>
                        <VehicleCardV2Skeleton />
                      </div>
                    ))}
                  </>
                ) : vehicleList && vehicleList.length > 0 ? (
                  <>
                    {vehicleList.map((vehicle, index) => {
                      const isLastElement = vehicleList.length === index + 1;
                      return renderDesktopVehicleCard(
                        vehicle,
                        index,
                        isLastElement,
                      );
                    })}

                    {loading && vehicleList?.length > 0 && (
                      <>
                        {[...Array(3)].map((_, index) => (
                          <div
                            key={`pagination-skeleton-${index}`}
                            className="col-12 col-md-6 col-xl-4"
                          >
                            <VehicleCardV2Skeleton />
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <div className="col-12 text-center py-5 mt-4">
                    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                      <MdSearchOff
                        style={{
                          fontSize: "64px",
                          color: "#d1d5db",
                          marginBottom: "16px",
                        }}
                      />
                      <h4
                        style={{
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: "8px",
                        }}
                      >
                        {t("VEHICLES_LISTING.NO_RESULTS.TITLE")}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: "15px",
                          lineHeight: "1.6",
                        }}
                      >
                        {t("VEHICLES_LISTING.NO_RESULTS.MESSAGE")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />

      <div className="d-lg-none">
        <FilterBottomSheet
          bottomSheetVisible={filterBottomSheetVisible}
          closeBottomSheet={handleCloseFilterBottomSheet}
          closeBottomSheetAfterFilterApplied={
            handleCloseFilterBottomSheetAfterApply
          }
          useFilters={filterContext}
        />
      </div>
    </main>
  );
};

export default DesktopVehicleListing;

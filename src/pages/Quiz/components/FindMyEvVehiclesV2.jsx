import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  getEMIStartsValue,
  getFormattedCurrency,
  getRto,
  getShorthandCurrencyFormat,
} from "../../../utils/commonUtils";
import { CLICK, VehicleListing } from "../../../services/constants";
import { ProjectSchemaContext } from "../../../context/ProjectSchemaProvider";
import { useQuizFilter } from "../../../context/VehicleListProvider";
import { sendEvent } from "../../../services/analytics-service";
import { useScrollToTop } from "../../../customHooks/useScrollToTop";
import VehicleCardV2 from "../../../common-components/cards/VehicleCardV2";
import VehicleCardV2Skeleton from "../../../common-components/cards/VehicleCardV2Skeleton";
import Footer from "../../../common-components/Footer";
import NoSearchResultsComponent from "../../../common-components/NoSearchResultsComponent";

const FindMyEvVehiclesV2 = () => {
  const {
    vehicleList,
    fetchVehiclesData,
    loading,
    isMoreData,
    appliedFilters,
  } = useQuizFilter();

  const { t } = useTranslation();
  const { schema } = useContext(ProjectSchemaContext);

  useScrollToTop([], "instant");

  const filter = JSON.parse(
    sessionStorage.getItem("appliedFindMyEvFilters") || "{}",
  );

  const handleLoadMore = () => {
    fetchVehiclesData(filter);
  };

  useEffect(() => {
    if (!loading) {
      const eventBody = {
        flowContext: `EV_QUIZ_COMPLETE`,
        action: CLICK,
        source_page: window.location.pathname,
        questions: JSON.stringify(appliedFilters),
        no_of_vehicles_shown: vehicleList?.length,
        result: vehicleList?.length ? "Listing shown" : "Not visible",
      };
      sendEvent(eventBody);
    }
  }, [vehicleList, loading, appliedFilters]);

  const renderVehicleCard = (ele, index) => {
    const fields = ele?.fields || {};

    const year =
      findFieldFromFetchedData(fields, "registrationYear")?.fieldValue || "";
    const oemStr = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "oem",
      findFieldFromFetchedData(fields, "oem")?.fieldValue,
    );
    const model = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "model",
      findFieldFromFetchedData(fields, "model")?.fieldValue,
    );
    const variant = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "variant",
      findFieldFromFetchedData(fields, "variant")?.fieldValue,
    );

    const odometer =
      findFieldFromFetchedData(fields, "currentOdometer")?.fieldValue || "";
    const targetSellingPrice = findFieldFromFetchedData(
      fields,
      "targetSellingPrice",
    )?.fieldValue;
    const vehicleRegNumber = findFieldFromFetchedData(
      fields,
      "vehicleRegNumber",
    )?.fieldValue;
    const vehicleId = findFieldFromFetchedData(fields, "vehicleId")?.fieldValue;
    const thumbnail = findFieldFromFetchedData(fields, "thumbnail")?.fieldValue;

    const chargingTime = findFieldFromFetchedData(
      fields,
      "chargingTime",
    )?.fieldValue;
    const vehicleType = findFieldFromFetchedData(
      fields,
      "vehicleType",
    )?.fieldValue;
    const oem = findFieldFromFetchedData(fields, "oem")?.fieldValue;

    const formattedName = `${oemStr} ${model} ${variant}`.trim();

    return (
      <div className="col-12 col-md-6 col-xl-4" key={ele?.objectId || index}>
        <VehicleCardV2
          thumbnailIds={thumbnail}
          vehicle_name={formattedName}
          odometer={odometer}
          rto={getRto(vehicleRegNumber)}
          emi_price={getFormattedCurrency(
            getEMIStartsValue(targetSellingPrice),
          )}
          vehicle_price={getShorthandCurrencyFormat(targetSellingPrice)}
          navigate_url={`${ele?.objectId}/details`}
          vehicleId={vehicleId}
          chargeTime={chargingTime}
          model={model}
          vehicle_type={vehicleType}
          vehicleNo={vehicleRegNumber}
          oem={oem}
          cardStyle={{
            height: "100%",
            cursor: "pointer",
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "16px",
            background: "#ffffff",
            transition: "all 0.2s ease",
          }}
        />
      </div>
    );
  };

  return (
    <div
      className="desktop-vehicle-listing"
      style={{
        minHeight: "100vh",
        width: "100%",
        alignSelf: "flex-start",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container-fluid px-lg-5 py-4">
        {/* Top Bar: Title Block */}

        <div className="row">
          {/* MAIN CONTENT */}
          <div
            className="col-12"
            style={{
              background: "#ffffff",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <div className="row g-4">
              {loading && (!vehicleList || vehicleList.length === 0) ? (
                // Initial Loading state
                <>
                  {[...Array(6)].map((_, index) => (
                    <div
                      className="col-12 col-md-6 col-xl-4"
                      key={`skel-initial-${index}`}
                    >
                      <VehicleCardV2Skeleton />
                    </div>
                  ))}
                </>
              ) : vehicleList && vehicleList.length > 0 ? (
                // Data Loaded state
                <>
                  {vehicleList.map((vehicle, index) =>
                    renderVehicleCard(vehicle, index),
                  )}

                  {/* Skeletons to show at the bottom while fetching next page */}
                  {loading &&
                    [...Array(3)].map((_, index) => (
                      <div
                        className="col-12 col-md-6 col-xl-4"
                        key={`skel-more-${index}`}
                      >
                        <VehicleCardV2Skeleton />
                      </div>
                    ))}

                  {/* Load More Button */}
                  {isMoreData && (
                    <div className="col-12 d-flex justify-content-center mt-5">
                      <button
                        className="btn bg-white"
                        style={{
                          border: "1px solid #6c5ce7",
                          color: "#6c5ce7",
                          borderRadius: "8px",
                          fontWeight: "600",
                          padding: "10px 32px",
                        }}
                        onClick={handleLoadMore}
                        disabled={loading}
                      >
                        {loading
                          ? "Loading..."
                          : t("VEHICLES_LISTING.LOAD_MORE")}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Empty state (No results)
                <div className="col-12 text-center py-5">
                  <NoSearchResultsComponent
                    noResultsMsg={t("FIND_MY_EV.NO_RESULTS.MESSAGE")}
                    showBtn={true}
                    noResultsBtnText={t("FIND_MY_EV.NO_RESULTS.RETAKE_QUIZ")}
                    navigateURL={{
                      pathname:
                        window.location.pathname?.split("vehicles-list")[0],
                      search: window.location.search,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindMyEvVehiclesV2;

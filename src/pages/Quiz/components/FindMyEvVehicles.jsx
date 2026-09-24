import { useContext, useEffect } from "react";
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
import VehicleCardSkeleton from "../../../common-components/skeletons/VehicleCardSkeleton";
import VehicleCard from "../../../common-components/cards/VehicleCard";
import { useQuizFilter } from "../../../context/VehicleListProvider";
import NoSearchResultsComponent from "../../../common-components/NoSearchResultsComponent";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";

const FindMyEvVehicles = () => {
  const {
    vehicleList,
    fetchVehiclesData,
    loading,
    isMoreData,
    appliedFilters,
  } = useQuizFilter();

  const { t } = useTranslation();

  const { schema } = useContext(ProjectSchemaContext);

  const filter = JSON.parse(
    sessionStorage.getItem("appliedFindMyEvFilters") || "{}"
  );

  const handleLoadMore = () => {
    fetchVehiclesData(filter);
  };

  const renderVehicles = () => {
    return vehicleList?.map((ele) => {
      const fields = ele?.fields || {};

      const year =
        findFieldFromFetchedData(fields, "registrationYear")?.fieldValue || "";
      const oem = fieldKeyAndValueMap(
        schema,
        VehicleListing,
        "oem",
        findFieldFromFetchedData(fields, "oem")?.fieldValue
      );
      const model = fieldKeyAndValueMap(
        schema,
        VehicleListing,
        "model",
        findFieldFromFetchedData(fields, "model")?.fieldValue
      );
      const variant = fieldKeyAndValueMap(
        schema,
        VehicleListing,
        "variant",
        findFieldFromFetchedData(fields, "variant")?.fieldValue
      );
      const odometer =
        findFieldFromFetchedData(fields, "currentOdometer")?.fieldValue || "";
      const targetSellingPrice = findFieldFromFetchedData(
        fields,
        "targetSellingPrice"
      )?.fieldValue;
      const vehicleRegNumber = findFieldFromFetchedData(
        fields,
        "vehicleRegNumber"
      )?.fieldValue;
      const vehicleId = findFieldFromFetchedData(
        fields,
        "vehicleId"
      )?.fieldValue;
      const thumbnail = findFieldFromFetchedData(
        fields,
        "thumbnail"
      )?.fieldValue;

      return (
        <VehicleCard
          key={ele?.objectId}
          cardStyle={{ width: "100%" }}
          thumbnailIds={thumbnail}
          vehicle_name={`${year} ${oem} ${model} ${variant}`.trim()}
          odometer={odometer}
          emi_price={getFormattedCurrency(
            getEMIStartsValue(targetSellingPrice)
          )}
          vehicle_price={getShorthandCurrencyFormat(targetSellingPrice)}
          rto={getRto(vehicleRegNumber)}
          navigate_url={`${ele?.objectId}/details`}
          vehicleId={vehicleId}
        />
      );
    });
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
  }, [vehicleList, loading]);

  return (
    <div className="vertical_quiz_vehicle_listing">
      {loading && vehicleList?.length === 0 ? (
        Array.from({ length: 4 }).map((_, index) => (
          <VehicleCardSkeleton key={index} cardStyle={{ width: "100%" }} />
        ))
      ) : (
        <>
          {vehicleList?.length > 0 ? (
            renderVehicles()
          ) : (
            <div style={{ height: "80vh" }}>
              <NoSearchResultsComponent
                noResultsMsg={t("FIND_MY_EV.NO_RESULTS.MESSAGE")}
                showBtn={true}
                noResultsBtnText={t("FIND_MY_EV.NO_RESULTS.RETAKE_QUIZ")}
                navigateURL={{
                  pathname: window.location.pathname?.split("vehicles-list")[0],
                  search: window.location.search,
                }}
              />
            </div>
          )}

          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <VehicleCardSkeleton
                key={`skeleton-${index}`}
                cardStyle={{ width: "100%" }}
                fade_up_delay={index}
              />
            ))}

          {isMoreData && (
            <button
              className="btn secondary_btn shadow-sm"
              onClick={handleLoadMore}
            >
              {t("VEHICLES_LISTING.LOAD_MORE")}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FindMyEvVehicles;

import { useContext } from "react";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  getEMIStartsValue,
  getFormattedCurrency,
  getRto,
  getShorthandCurrencyFormat,
} from "../../../utils/commonUtils";
import { CLICK, VehicleListing, VIEW } from "../../../services/constants";
import { ProjectSchemaContext } from "../../../context/ProjectSchemaProvider";
import VehicleCardSkeleton from "../../../common-components/skeletons/VehicleCardSkeleton";
import VehicleCard from "../../../common-components/cards/VehicleCard";
import NoSearchResultsComponent from "../../../common-components/NoSearchResultsComponent";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";
import { useIntersectionObserver } from "../../../customHooks/useIntersectionObserver";

const VehiclesList = ({ useFilters }) => {
  const {
    vehicleList,
    fetchVehiclesData,
    loading,
    isMoreData,
    appliedFilters,
  } = useFilters;
  const { schema } = useContext(ProjectSchemaContext);
  const { t } = useTranslation();

  const renderVehicleCard = (vehicle, index) => {
    const fields = vehicle?.fields || {};

    const getFieldValue = (key) =>
      findFieldFromFetchedData(fields, key)?.fieldValue;

    const year = getFieldValue("registrationYear") || "";
    const oem = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "oem",
      getFieldValue("oem")
    );
    const model = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "model",
      getFieldValue("model")
    );
    const variant = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "variant",
      getFieldValue("variant")
    );
    const odometer = getFieldValue("currentOdometer") || "";
    const targetSellingPrice = getFieldValue("targetSellingPrice");
    const vehicleRegNumber = getFieldValue("vehicleRegNumber");
    const thumbnail = getFieldValue("thumbnail");
    const vehicleId = getFieldValue("vehicleId");
    const vehicle_type = fieldKeyAndValueMap(
      schema,
      VehicleListing,
      "vehicleType",
      getFieldValue("vehicleType")
    );

    const eventsData = {
      vehicleId,
      registration_number: vehicleRegNumber,
      card_position: Number(index) + 1,
      oem_name: oem,
      vehicle_type,
    };

    return (
      <div
        key={vehicle?.objectId}
        className="w-100"
        data-aos="fade-up"
        data-track-visibility="true"
        data-vehicle-id={vehicleId}
        data-reg-num={vehicleRegNumber}
        data-oem-name={oem}
        data-vehicle-type={vehicle_type}
        data-card-position={index}
        data-aos-delay={index < 3 ? index * 100 : 0}
      >
        <VehicleCard
          cardStyle={{ width: "100%" }}
          thumbnailIds={thumbnail}
          vehicle_name={`${year} ${oem} ${model} ${variant}`.trim()}
          odometer={odometer}
          emi_price={getFormattedCurrency(
            getEMIStartsValue(targetSellingPrice)
          )}
          vehicle_price={getShorthandCurrencyFormat(targetSellingPrice)}
          rto={getRto(vehicleRegNumber)}
          navigate_url={`${vehicle?.objectId}/details`}
          vehicleId={vehicleId}
          handleCardClickEventCall={() => handleCardClickEventCall(eventsData)}
        />
      </div>
    );
  };

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <VehicleCardSkeleton
        key={index}
        cardStyle={{ width: "100%" }}
        fade_up_delay={index}
      />
    ));

  const handleCardViewEventCall = (target) => {
    const vehicleId = target?.getAttribute("data-vehicle-id");
    const registration_number = target?.getAttribute("data-reg-num");
    const oem_name = target?.getAttribute("data-oem-name");
    const card_position =
      Number(target?.getAttribute("data-card-position")) + 1;
    const results_count = vehicleList?.length;
    const vehicle_type = target?.getAttribute("data-vehicle-type");

    const eventBody = {
      flowContext: `BUY_LIST_PAGE_VEHICLE_CARD_VIEW`,
      action: VIEW,
      source_page: window.location.pathname,
      vehicleId,
      registration_number,
      oem_name,
      card_position,
      results_count,
      filters_json: appliedFilters,
      vehicle_type,
    };
    sendEvent(eventBody);
  };

  const handleCardClickEventCall = (data) => {
    const results_count = vehicleList?.length;

    const eventBody = {
      flowContext: `BUY_VEHICLE_CARD_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
      results_count,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(appliedFilters?.sortBy),
      ...data,
    };
    sendEvent(eventBody);
  };

  const handleLoadMoreEV = () => {
    const eventBody = {
      flowContext: `BUY_LIST_PAGE_LOAD_MORE_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);
    fetchVehiclesData(appliedFilters);
  };

  useIntersectionObserver(handleCardViewEventCall, 0.5);

  if (loading && vehicleList?.length === 0) {
    return <div className="vertical_vehicle_listing">{renderSkeletons()}</div>;
  }

  return (
    <div className="vertical_vehicle_listing">
      {vehicleList?.length === 0 ? (
        <div className="no_vehicles_component_container">
          <NoSearchResultsComponent
            noResultsMsg={t("VEHICLES_LISTING.NO_RESULTS.MESSAGE")}
          />
        </div>
      ) : (
        <>
          {vehicleList.map((vehicle, index) =>
            renderVehicleCard(vehicle, index)
          )}
          {loading && renderSkeletons()}
          {isMoreData && (
            <button
              className="btn secondary_btn shadow-sm"
              onClick={handleLoadMoreEV}
            >
              {t("VEHICLES_LISTING.LOAD_MORE")}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VehiclesList;

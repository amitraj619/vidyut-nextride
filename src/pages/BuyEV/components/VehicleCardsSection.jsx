import VehicleCard from "../../../common-components/cards/VehicleCard";
import { useContext, useMemo, useCallback } from "react";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  getEMIStartsValue,
  getFormattedCurrency,
  getRto,
  getShorthandCurrencyFormat,
} from "../../../utils/commonUtils";
import { ProjectSchemaContext } from "../../../context/ProjectSchemaProvider";
import { CLICK, VehicleListing } from "../../../services/constants";
import VehicleCardSkeleton from "../../../common-components/skeletons/VehicleCardSkeleton";
import { useEVsNearYouFilter } from "../../../context/VehicleListProvider";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";

const VehicleCardsSection = ({ children }) => {
  const { schema } = useContext(ProjectSchemaContext);
  const { vehicleList, loading, appliedFilters } = useEVsNearYouFilter();
  const { t } = useTranslation();

  const handleCardClickEventCall = useCallback(
    (data) => {
      sendEvent({
        flowContext: `BUY_VEHICLE_CARD_CLICK`,
        source_page: window.location.pathname,
        action: CLICK,
        results_count: vehicleList?.length,
        filters_json: appliedFilters,
        sort_option: JSON.stringify(appliedFilters?.sortBy),
        ...data,
      });
    },
    [appliedFilters, vehicleList?.length]
  );

  // Memoize cards data to avoid recalculating on every render
  const cardsData = useMemo(() => {
    if (!vehicleList || !schema) return [];

    return vehicleList.slice(0, 4).map((ele, idx) => {
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

      return {
        objectId: ele?.objectId,
        thumbnail,
        vehicle_name: `${year} ${oem} ${model} ${variant}`.trim(),
        odometer,
        emi_price: getFormattedCurrency(getEMIStartsValue(targetSellingPrice)),
        vehicle_price: getShorthandCurrencyFormat(targetSellingPrice),
        rto: getRto(vehicleRegNumber),
        navigate_url: `${ele?.objectId}/details`,
        vehicleId,
        eventsData: {
          vehicleId,
          registration_number: vehicleRegNumber,
          card_position: idx + 1,
          oem_name: oem,
        },
      };
    });
  }, [vehicleList, schema]);

  return (
    <div
      className={`cards_section ${vehicleList?.length ? "d-flex" : "d-none"}`}
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h2
        className="section_header"
        style={{ fontSize: "24px", lineHeight: "32px" }}
      >
        {t("EVS_FOR_SALE.PAGE_TITLE")}
      </h2>
      <div className="scrolling_cards_container">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <VehicleCardSkeleton key={index} fade_up_delay={index} />
            ))
          : cardsData?.map((card) => (
              <VehicleCard
                key={card.objectId}
                thumbnailIds={card.thumbnail}
                vehicle_name={card.vehicle_name}
                odometer={card.odometer}
                emi_price={card.emi_price}
                vehicle_price={card.vehicle_price}
                rto={card.rto}
                navigate_url={card.navigate_url}
                vehicleId={card.vehicleId}
                handleCardClickEventCall={() =>
                  handleCardClickEventCall(card.eventsData)
                }
              />
            ))}
      </div>
      <div className="px-3">{children}</div>
    </div>
  );
};

export default VehicleCardsSection;

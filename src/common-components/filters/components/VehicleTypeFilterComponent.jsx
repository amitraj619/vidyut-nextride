import { findFieldSchemaWithObjectName } from "../../../utils/commonUtils";
import MultiSelectFilter from "./MultiSelectFilter";
import { VehicleListing } from "../../../services/constants";

const VehicleTypeFilterComponent = ({ schema, useFilters }) => {
  const { selectedFilterDraft, setSelectedFilterDraft } = useFilters;

  return (
    <div className="ps-4 py-4">
      <MultiSelectFilter
        field={findFieldSchemaWithObjectName(
          "vehicleType",
          VehicleListing,
          schema
        )}
        selectedFilterDraft={selectedFilterDraft}
        setSelectedFilterDraft={setSelectedFilterDraft}
      />
    </div>
  );
};

export default VehicleTypeFilterComponent;

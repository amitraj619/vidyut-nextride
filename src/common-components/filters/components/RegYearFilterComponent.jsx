import { findFieldSchemaWithObjectName } from "../../../utils/commonUtils";
import MultiSelectFilter from "./MultiSelectFilter";
import { VehicleListing } from "../../../services/constants";

const RegYearFilterComponent = ({ schema, useFilters }) => {
  const { selectedFilterDraft, setSelectedFilterDraft } = useFilters;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => ({
    name: `${currentYear - i}`,
    key: currentYear - i,
  }));

  return (
    <div className="ps-4 py-4">
      <MultiSelectFilter
        field={findFieldSchemaWithObjectName(
          "registrationYear",
          VehicleListing,
          schema,
        )}
        selectedFilterDraft={selectedFilterDraft}
        setSelectedFilterDraft={setSelectedFilterDraft}
        selectableValueList={years}
        sortEnabled={false}
      />
    </div>
  );
};

export default RegYearFilterComponent;

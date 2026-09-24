import React, { useMemo } from "react";
import { findFieldSchemaWithObjectName } from "../../../utils/commonUtils";
import MultiSelectFilter from "./MultiSelectFilter";
import { VehicleListing } from "../../../services/constants";

const BrandFilterComponent = ({ schema, useFilters }) => {
  const { selectedFilterDraft, setSelectedFilterDraft } = useFilters;

  const preferredOrder = [
    "MAHINDRA",
    "EULER",
    "OMEGA_SEIKI",
    "PIAGGIO",
    "MONTRA",
    "ALTI_GREEN",
  ];

  // Fetch and sort the schema
  const sortedOemField = useMemo(() => {
    const field = findFieldSchemaWithObjectName("oem", VehicleListing, schema);

    if (!field || !field.selectableValues) return field;

    const sortedValues = [...field.selectableValues].sort((a, b) => {
      let indexA = preferredOrder.indexOf(a.key);
      let indexB = preferredOrder.indexOf(b.key);

      if (indexA === -1) indexA = Number.MAX_SAFE_INTEGER;
      if (indexB === -1) indexB = Number.MAX_SAFE_INTEGER;

      return indexA - indexB;
    });

    return { ...field, selectableValues: sortedValues };
  }, [schema]);

  return (
    <div className="ps-4 pt-4">
      <MultiSelectFilter
        field={sortedOemField}
        selectedFilterDraft={selectedFilterDraft}
        setSelectedFilterDraft={setSelectedFilterDraft}
        sortEnabled={false}
      />
    </div>
  );
};

export default BrandFilterComponent;

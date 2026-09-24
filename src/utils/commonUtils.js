import {
  CustomerEnquiry,
  project_name,
  VehicleListing,
} from "../services/constants";

export const getFormattedCurrency = (number) => {
  return isNaN(number)
    ? null
    : new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
        useGrouping: true,
      }).format(number);
};

export const getShorthandCurrencyFormat = (num) => {
  if (!num) return "";

  const truncateTo1Decimal = (value) => {
    return Math.floor(value * 10) / 10;
  };

  if (num >= 10000000) {
    const truncated = truncateTo1Decimal(num / 10000000);
    return `${truncated.toString().replace(/\.0$/, "")}Cr`;
  } else if (num >= 100000) {
    const truncated = truncateTo1Decimal(num / 100000);
    return `${truncated.toString().replace(/\.0$/, "")}L`;
  }

  return num.toString();
};

export const truncateHttpErrorCode = (str) => {
  // Use a regular expression to match an HTTP response code at the start
  const match = str.match(/^(\d{3})\s/);

  // Check if there's a match and if the code is greater than 500
  if (match && parseInt(match[1]) >= 400) {
    return str.replace(/^\d{3}\s/, "");
  }
  return str; // Return the original string if no condition is met
};

export const getFilterPayload = (appliedFilterData) => {
  if (!appliedFilterData) return null;

  let idCounter = 1;

  const { sortBy = {}, ...filters } = appliedFilterData;

  const filterCriteria = Object.entries(filters)
    .filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "object" && value !== null)
        return Object.values(value).some((v) => v !== "");
      return false;
    })
    .map(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        return {
          fieldName: key,
          lowerBound: value.lowerBound,
          upperBound: value.upperBound,
          id: idCounter++,
        };
      }

      return {
        fieldName: key,
        values: value,
        id: idCounter++,
      };
    });

  return {
    projectName: project_name,
    objectName: VehicleListing,
    filterCriteria,
    filterCriteriaAggregationType: "CONJUNCTION",
    sortField: sortBy.sortField,
    sortDirection: sortBy.sortDirection,
  };
};

export function findFieldFromFetchedData(fieldsArray, fieldName) {
  return fieldsArray?.find((field) => field?.fieldName === fieldName) || null;
}

export const renderFieldValue = (
  fieldSchema,
  schema,
  prefixSymbol,
  objectName,
) => {
  if (fieldSchema?.fieldType === "SINGLE_SELECT") {
    return fieldSchema?.fieldValue
      ? `${prefixSymbol} ${fieldKeyAndValueMap(
          schema,
          objectName,
          fieldSchema?.fieldName,
          String(fieldSchema?.fieldValue),
        )}`
      : "NA";
  }

  return fieldSchema?.fieldValue
    ? `${prefixSymbol} ${String(fieldSchema?.fieldValue)}`
    : "NA";
};

export const fieldKeyAndValueMap = (schema, objectName, fieldName, key) => {
  const selectedField = findFieldSchemaWithObjectName(
    fieldName,
    objectName,
    schema,
  );

  return selectedField?.selectableValues?.find((e) => e.key === key)?.name;
};

export const findFieldSchemaWithObjectName = (
  fieldName,
  objectName,
  formSchema,
) => {
  for (const obj of formSchema?.data?.projectConfig?.objects || []) {
    if (obj?.name === objectName) {
      for (const field of obj?.fields || []) {
        if (field?.name === fieldName) {
          return { ...field, objectName: obj?.name };
        }
      }
    }
  }
  return null;
};

export const getRto = (rtoNumber) =>
  `${rtoNumber}`?.slice(0, 2) + " " + `${rtoNumber}`?.slice(2, 4);

export const convertFromISO8601Duration = (isoDuration) => {
  if (!isoDuration) return "";

  // Use a regular expression to extract the hours (H) and minutes (M) from the ISO string
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);

  // Extract hours and minutes, defaulting to 0 if they are not present
  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;

  // Format the hours and minutes as "HH:mm"
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export const formatTime = (value) => {
  if (!value) return "";
  const formattedValue = value.split(":");
  return `${formattedValue[0]} hr ${formattedValue[1]} mins`;
};

export const isFilterSelected = (key, filter) => {
  if (Object.keys(filter)?.length === 0) return false;

  if (key === "targetSellingPrice") {
    return filter?.[key]?.lowerBound !== "" && filter?.[key]?.upperBound !== "";
  }

  if (key === "currentOdometer") {
    return filter?.[key]?.lowerBound !== "" && filter?.[key]?.upperBound !== "";
  }

  return filter?.[key]?.length !== 0;
};

export const getEMIStartsValue = (value) => {
  const number = Number(value);
  if (isNaN(number) || number <= 0) return 0;

  const principal = number * 0.9;
  const ratePerMonth = 20 / 12 / 100;
  const tenureInMonths = 36;

  const emi =
    (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureInMonths)) /
    (Math.pow(1 + ratePerMonth, tenureInMonths) - 1);

  return Math.round(emi);
};

export const transformCustomerEnquiry = (input) => {
  return {
    projectName: project_name,
    objectName: CustomerEnquiry,
    fields: Object.entries(input)
      .filter(([key, value]) => key !== "agreed" && value !== undefined)
      .map(([key, value]) => ({
        fieldName: key,
        fieldValue: value,
      })),
  };
};

export const getAppliedFiltersCount = (filters) => {
  let count = 0;

  for (const key in filters) {
    if (key === "city") continue;

    const value = filters[key];

    if (Array.isArray(value) && value.length > 0) {
      count++;
    } else if (
      typeof value === "object" &&
      value !== null &&
      Object.values(value).some(
        (v) => v !== "" && v !== null && v !== undefined,
      )
    ) {
      count++;
    }
  }

  return count;
};

export const shallowCompare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    }

    if (typeof val1 === "object" && val1 !== null && val2 !== null) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    }

    return val1 === val2;
  });
};

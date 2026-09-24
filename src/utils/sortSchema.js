export const sortSchema = {
  name: "sortBy",
  objectName: "sortBy",
  selectableValues: [
    {
      key: "NEWLY_ADDED",
      name: "Newly added",
      sortField: "createdAt",
      sortDirection: "DESC",
    },
    {
      key: "PRICE_LOW_TO_HIGH",
      name: "Price: low to high",
      sortField: "targetSellingPrice",
      sortDirection: "ASC",
    },
    {
      key: "PRICE_HIGH_TO_LOW",
      name: "Price: high to low",
      sortField: "targetSellingPrice",
      sortDirection: "DESC",
    },
  ],
};

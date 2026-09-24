import { useContext } from "react";

export const createUseFilterContext = (FilterContext) => {
  return () => {
    const ctx = useContext(FilterContext);
    if (!ctx)
      throw new Error("useFilterContext must be used within its Provider");
    return ctx;
  };
};

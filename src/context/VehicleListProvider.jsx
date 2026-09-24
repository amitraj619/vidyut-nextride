import { createFilterContext, createFilterProvider } from "./FilterProvider";
import { createUseFilterContext } from "./useFilterContext";

export const GeneralFilterContext = createFilterContext();
export const BrandFilterContext = createFilterContext();
export const QuizFilterContext = createFilterContext();
export const EVsNearYouFilterContext = createFilterContext();

export const GeneralFilterProvider = createFilterProvider(
  GeneralFilterContext,
  "appliedFilters"
);
export const BrandFilterProvider = createFilterProvider(
  BrandFilterContext,
  "appliedBrandFilters"
);
export const QuizFilterProvider = createFilterProvider(
  QuizFilterContext,
  "appliedFindMyEvFilters"
);

export const EVsNearYouFilterProvider = createFilterProvider(
  EVsNearYouFilterContext,
  "EVsNearYouFilters"
);

export const useGeneralFilter = createUseFilterContext(GeneralFilterContext);
export const useBrandFilter = createUseFilterContext(BrandFilterContext);
export const useQuizFilter = createUseFilterContext(QuizFilterContext);
export const useEVsNearYouFilter = createUseFilterContext(
  EVsNearYouFilterContext
);

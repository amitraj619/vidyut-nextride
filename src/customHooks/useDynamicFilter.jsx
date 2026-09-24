import {
  useBrandFilter,
  useEVsNearYouFilter,
  useGeneralFilter,
  useQuizFilter,
} from "../context/VehicleListProvider";

export const useDynamicFilter = (type) => {
  const generalFilter = useGeneralFilter();
  const brandFilter = useBrandFilter();
  const quizFilter = useQuizFilter();
  const evsNearYouFilter = useEVsNearYouFilter();

  if (type === "brand") return brandFilter;
  if (type === "quiz") return quizFilter;
  if (type === "vehicleType") return evsNearYouFilter;

  return generalFilter;
};

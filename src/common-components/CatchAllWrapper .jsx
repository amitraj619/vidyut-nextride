import { useLocation } from "react-router-dom";
import ComingSoonCitiesPage from "../pages/ComingSoon/ComingSoonCitiesPage";
import PageNotFound from "../pages/Errors/PageNotFound";

const CatchAllWrapper = () => {
  const location = useLocation();

  if (location.pathname.endsWith("/coming-soon")) {
    return <ComingSoonCitiesPage />;
  }

  return <PageNotFound />;
};

export default CatchAllWrapper;

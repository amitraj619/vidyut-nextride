import "./SCSS/style.scss";
import not_found from "../../assets/images/not_found.webp";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";

const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page_not_found">
      <SEO data={seoData.DEFAULT} />
      <img src={not_found} alt="not found" />
      <div className="page_not_found_text">Oops, Page not found</div>
      <button
        className="btn primary_btn"
        onClick={() => navigate({ pathname: "/", search: location.search })}
      >
        Go to home
      </button>
    </div>
  );
};

export default PageNotFound;

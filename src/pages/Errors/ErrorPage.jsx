import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <SEO data={seoData.DEFAULT} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
      <div>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
};

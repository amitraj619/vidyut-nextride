import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { validateUser } from "../services/validateUser";
import { isUAT } from "../utils/EnvUtils";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkValidation = async () => {
    if (isUAT()) {
      const data = await validateUser();
      !data?.status
        ? navigate({ pathname: "/login", search: location.search })
        : "";
    }
  };

  useEffect(() => {
    checkValidation();
    scrollUp();
  }, [location.pathname]);

  return (
    <>
      <div className=" position-relative" id="scroll-div">
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoutes;

export const scrollUp = () => {
  const element = document.getElementById("scroll-div");
  if (element) {
    element.scrollTop = 0;
  }
};

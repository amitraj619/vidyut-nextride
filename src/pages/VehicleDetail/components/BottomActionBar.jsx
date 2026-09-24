import { useNavigate, useSearchParams } from "react-router-dom";
import { getFormattedCurrency } from "../../../utils/commonUtils";
import { useTranslation } from "react-i18next";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const BottomActionBar = ({
  price,
  vehicleNo,
  loading,
  handleBuyTestRideClick,
  oem,
  model,
  vehicle_type,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleBookTestRideClick = () => {
    handleBuyTestRideClick();
    searchParams.set("model", model);
    searchParams.set("vehicle_type", vehicle_type);
    navigate({
      pathname: `${vehicleNo}/${oem}/TEST_RIDE/customer-enquiry`,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="bottom_action_bar_con">
      <div className="bottom_actions">
        <div className="label">
          {loading ? (
            <CustomSkeleton width={92} height={16} borderRadius={4} />
          ) : (
            <>{t("VEHICLE_DETAILS.VIDYUTS_PRICE")}</>
          )}
        </div>
        <div className="value">
          {loading ? (
            <CustomSkeleton width={92} height={24} borderRadius={4} />
          ) : (
            <>₹{getFormattedCurrency(price)}</>
          )}
        </div>
      </div>
      {loading ? (
        <CustomSkeleton width={199} height={48} borderRadius={8} />
      ) : (
        <button
          className="primary_btn btn w-50"
          onClick={handleBookTestRideClick}
        >
          {t("VEHICLE_DETAILS.BOOK_TEST_RIDE")}
        </button>
      )}
    </div>
  );
};

export default BottomActionBar;

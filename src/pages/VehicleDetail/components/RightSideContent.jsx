import { useTranslation } from "react-i18next";
import VehicleAudioSummary from "./VehicleAudioSummary";
import {
  location_black_icon,
  lock_icon,
} from "../../../assets/SVGIcons/CommonIcons";

export const RightSideContent = ({
  vehicleName,
  vehicleTags,
  vehicleId,
  audioSummaryField,
  currentAddress,
  price,
  estEmi,
  handleBuyTestRideClick,
  shouldShowAudioSummary,
  registration_number,
  oem,
  vehicle_type,
}) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h2 className="fw-bold mb-2">{vehicleName}</h2>
        <div className="d-flex flex-wrap gap-2">
          {vehicleTags.map((tag, idx) => (
            <span
              key={idx}
              className="badge bg-secondary bg-opacity-10 text-dark rounded-pill px-3 py-2 border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {shouldShowAudioSummary && (
        <VehicleAudioSummary
          vehicleId={vehicleId}
          audioField={audioSummaryField}
          registration_number={registration_number}
          oem={oem}
          vehicle_type={vehicle_type}
        />
      )}

      <div className="card shadow-sm border-0 rounded-4">
        <div className="list-group list-group-flush rounded-4">
          <div className="list-group-item p-3 d-flex align-items-start gap-3 border-0">
            <span className="text-muted">{location_black_icon}</span>
            <small className="mt-1" style={{ fontSize: "14px" }}>
              {currentAddress || "Location details unavailable."}
            </small>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-6">
          <div className="card shadow-sm border-0 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center p-3 text-center">
            <small className="text-muted mb-1" style={{ fontSize: "12px" }}>
              {t("VEHICLE_DETAILS.OUR_PRICE")}
            </small>
            <h5 className="fw-bold m-0" style={{ color: "#212121" }}>
              ₹{price ? price.toLocaleString("en-IN") : "--"}
            </h5>
          </div>
        </div>

        <div className="col-6">
          <div
            className="card shadow-sm border-0 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center p-3 text-center"
            onClick={(e) => handleBuyTestRideClick(e, "CHECK_AMOUNT")}
            style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <small className="text-muted mb-2" style={{ fontSize: "12px" }}>
              {t("VEHICLE_DETAILS.DOWNPAYMENT_LOW_AS", "Downpayment as low as")}
            </small>
            <button
              style={{
                background: "#f1e9fe",
                color: "#7225f5",
                border: "none",
                borderRadius: "999px",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {lock_icon} {t("VEHICLE_DETAILS.CHECK_AMOUNT")}
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-4 d-none d-lg-block">
        <div className="card-body p-4">
          <small className="text-muted d-block mb-1">
            {t("VEHICLE_DETAILS.EMI_STARTS", "EMI starts")}
          </small>
          <div className="d-flex align-items-baseline mb-4">
            <h2 className="fw-bold m-0">
              ₹{estEmi ? estEmi.toLocaleString("en-IN") : "--"}
            </h2>
            <small className="text-muted ms-1">
              /{t("VEHICLE_DETAILS.MONTH")}
            </small>
          </div>
          <button
            onClick={(e) => handleBuyTestRideClick(e, "TEST_RIDE")}
            className="btn w-100 text-white fw-bold py-3 rounded-3"
            style={{
              backgroundColor: "#7225f5",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#5c1bbd")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#7225f5")
            }
          >
            {t("VEHICLE_DETAILS.BOOK_TEST_RIDE", "Book test ride")}
          </button>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cargo_image from "../../../assets/images/quiz_cargo_vehicle.webp";
import passenger_image from "../../../assets/images/quiz_Passenger_vehicle.webp";
import { CLICK } from "../../../services/constants";
import { sendEvent } from "../../../services/analytics-service";

const VehicleSelectionModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);

    queueMicrotask(() => {
      sendEvent({
        flowContext: "BEST_DEALS_VEHICLE_TYPE_SELECTED",
        action: CLICK,
        source_page: window.location.pathname,
        vehicle_type: type,
      });
    });
  };

  const handleSubmit = () => {
    if (!selectedType) return;

    const destinationPath = "/buy-used-ev/all-ev-vehicles";

    sendEvent({
      flowContext: "BEST_DEALS_SHOW_VEHICLES_CLICKED",
      action: CLICK || "CLICK",
      source_page: window.location.pathname,
      vehicle_type: selectedType,
      destination_page: destinationPath,
    });

    setTimeout(() => {
      onSubmit(selectedType);
    }, 10);
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "400px",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          animation: "scaleIn 0.2s ease-out",
        }}
      >
        <style>
          {`
            @keyframes scaleIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .vehicle-card {
              flex: 1;
              background-color: #ffffff;
              border-radius: 16px;
              padding: 32px 16px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center; 
              gap: 16px;
              cursor: pointer;
              border: 2px solid transparent;
              transition: all 0.2s ease;
            }
            .vehicle-card.selected {
              background: linear-gradient(180deg, #f3f3fd 0%, #e8e8fa 100%);
              border: 2px solid #7225f5;
              box-shadow: 0 4px 12px rgba(114, 37, 245, 0.15);
            }
          `}
        </style>

        {/* Modal Header */}
        <div style={{ textAlign: "center", padding: "32px 24px 16px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "#111827",
              margin: "0 0 8px 0",
            }}
          >
            {t("MODAL.REQUIREMENT_TITLE")}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              margin: 0,
              fontWeight: "500",
            }}
          >
            {t("MODAL.CHOOSE_VEHICLE")}
          </p>
        </div>

        {/* Selection Cards */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "0 24px 32px 24px",
          }}
        >
          {/* Passenger Card */}
          <div
            className={`vehicle-card ${selectedType === "PASSENGER" ? "selected" : ""}`}
            onClick={() => handleTypeSelection("PASSENGER")}
          >
            <img
              src={passenger_image}
              alt="Passenger Vehicle"
              style={{
                maxWidth: "100%",
                height: "64px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: selectedType === "PASSENGER" ? "#7225f5" : "#1f2937",
              }}
            >
              {t("MODAL.PASSENGER")}
            </span>
          </div>

          {/* Cargo Card */}
          <div
            className={`vehicle-card ${selectedType === "CARGO" ? "selected" : ""}`}
            onClick={() => handleTypeSelection("CARGO")}
          >
            <img
              src={cargo_image}
              alt="Cargo Vehicle"
              style={{
                maxWidth: "100%",
                height: "64px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: selectedType === "CARGO" ? "#7225f5" : "#1f2937",
              }}
            >
              {t("MODAL.CARGO")}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          style={{
            width: "100%",
            backgroundColor: selectedType ? "#8b5cf6" : "#d1d5db",
            color: "#ffffff",
            padding: "20px",
            border: "none",
            fontSize: "1.2rem",
            fontWeight: "700",
            cursor: selectedType ? "pointer" : "not-allowed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            transition: "background-color 0.2s",
          }}
        >
          {t("MODAL.SHOW_VEHICLES")} <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default VehicleSelectionModal;

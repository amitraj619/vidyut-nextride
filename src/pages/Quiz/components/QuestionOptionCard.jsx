import { useState } from "react";
import "../SCSS/style.scss";

const QuestionOptionCard = ({
  option,
  isSelected,
  onClick,
  disableOptions,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => !disableOptions && onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        background: isSelected ? "#f4eeff" : "#ffffff",
        border: `2px solid ${isSelected ? "#7225f5" : isHovered ? "#d4c5ff" : "#e2e2ec"}`,
        borderRadius: "16px",
        cursor: disableOptions ? "default" : "pointer",
        transition: "all 0.25s ease",
        boxShadow: isSelected
          ? "0 8px 24px rgba(114, 37, 245, 0.15)"
          : isHovered
            ? "0 8px 16px rgba(0,0,0,0.06)"
            : "0 2px 8px rgba(0,0,0,0.02)",
        transform:
          disableOptions && isSelected
            ? "scale(0.97)"
            : isHovered && !disableOptions
              ? "translateY(-4px)"
              : "translateY(0)",
      }}
    >
      {option.image && (
        <img
          src={option.image}
          alt={option.label}
          title={`title_${option?.label}`}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            marginBottom: "16px",
            transition: "transform 0.3s ease",
            transform: isHovered && !disableOptions ? "scale(1.1)" : "scale(1)",
          }}
        />
      )}
      <span
        style={{
          fontSize: "16px",
          fontWeight: isSelected ? 700 : 500,
          color: isSelected ? "#7225f5" : "#1a1a2e",
          textAlign: "center",
          transition: "color 0.2s ease",
        }}
      >
        {option.label}
      </span>
    </div>
  );
};

export default QuestionOptionCard;

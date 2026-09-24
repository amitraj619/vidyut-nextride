const SemiCircleProgressBar = ({
  progress = 50,
  size = 200,
  strokeWidth = 10,
  strokeColor = "#4CAF50",
  bgColor = "#E0E0E0",
  show_percentage = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
      {/* Background Circle */}
      <path
        d={`M ${strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 1 ${
          size - strokeWidth / 2
        },${size / 2}`}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
      />

      {/* Progress Arc */}
      <path
        d={`M ${strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 1 ${
          size - strokeWidth / 2
        },${size / 2}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset || null}
        // strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />

      {/* Progress Text */}
      {show_percentage && (
        <text x="50%" y="90%" textAnchor="middle" fontSize="16" fill="#333">
          {progress}%
        </text>
      )}
    </svg>
  );
};

export default SemiCircleProgressBar;

export const getEnvConfig = () => {
  const origin = window.location.origin;

  if (origin.includes("localhost") || origin.includes("uat")) {
    return { env: "UAT" };
  }

  return { env: "PROD" };
};

export const isLocal = () => {
  const origin = window.location.origin;
  if (origin.includes("localhost")) {
    return true;
  } else {
    return false;
  }
};

export const isUAT = () => {
  const origin = window.location.origin;
  if (origin.includes("uat")) {
    return true;
  } else {
    return false;
  }
};

export const isPROD = () => {
  if (getEnvConfig()?.env === "PROD") {
    return true;
  } else {
    return false;
  }
};

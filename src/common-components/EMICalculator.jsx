import { useState, useCallback, useEffect, useRef } from "react";
import HorizontalProgressCard from "./cards/HorizontalProgressCard";
import { fetchEMICalculation } from "../services/commonServices";
import { getFormattedCurrency } from "../utils/commonUtils";
import SemiCircleProgressBar from "./SemiCircleProgressBar";
import { useTranslation } from "react-i18next";
import { CustomSkeleton } from "./skeletons/CommonSkeleton";

const EMICalculator = ({ vehicle_value, handleEMICalClick }) => {
  const { t } = useTranslation();
  const [emiValues, setEmiValues] = useState({});
  const [loading, setLoading] = useState(false);

  const [emiData, setEmiData] = useState({});
  const debounceTimerRef = useRef(null);

  // Fetch EMI details (called after user stops interaction)
  const fetchEMIDetails = useCallback(async (values, vehicle_value) => {
    setLoading(true);
    try {
      const updatedValues = { ...values, loanAmount: vehicle_value };
      const res = await fetchEMICalculation(updatedValues);
      setEmiData(res?.data || {});
    } catch (error) {
      console.log("Error fetching EMI details:", error);
    }
    setLoading(false);
  }, []);

  // Function to update EMI values and trigger API call after user stops
  const updateEmiValues = useCallback((key, value, vehicle_value) => {
    setEmiValues((prev) => {
      let updatedValues = { ...prev, [key]: value };

      // Ensure down payment & loan amount remain in sync
      if (key === "loanAmount") {
        updatedValues.downPayment = vehicle_value - value;
      } else if (key === "downPayment") {
        updatedValues.loanAmount = vehicle_value - value;
      }

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        fetchEMIDetails(updatedValues, vehicle_value);
        handleEMICalClick(key);
      }, 500);

      return updatedValues;
    });
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    if (vehicle_value) {
      const emiInitialValue = {
        interestRate: 20,
        loanAmount: vehicle_value * 0.9,
        downPayment: vehicle_value - vehicle_value * 0.9,
        loanTenureInMonths: 36,
      };
      setEmiValues(emiInitialValue);
      fetchEMIDetails(emiInitialValue, vehicle_value);
    }
  }, [vehicle_value]);

  return (
    <div className="cards_section" data-aos="fade-up">
      <h2 className="section_header">
        {t("VEHICLE_DETAILS.EMI_CALCULATOR.TITLE")}
      </h2>
      <div className="emi_calculator_container">
        <div className="emi_calculator_inner_con">
          {/* EMI report */}
          <div className="emi_calculator_report">
            {/* EMI staring from with progress graph */}
            <div className="emi_starts_from_with_progress_graph">
              <div className="emi_price_con">
                <label>
                  {t("VEHICLE_DETAILS.EMI_CALCULATOR.EMI_STARTING_FROM")}
                </label>
                <div className="emi_price">
                  ₹
                  {loading ? (
                    <CustomSkeleton width={65} height={23} />
                  ) : (
                    getFormattedCurrency(emiData?.emiAmount) || "--"
                  )}
                  /{t("VEHICLE_DETAILS.EMI_CALCULATOR.M")}
                </div>
              </div>
              <div className="emi_progress_graph">
                {loading ? (
                  <CustomSkeleton width={120} height={40} />
                ) : (
                  <SemiCircleProgressBar
                    progress={
                      (emiData?.principalLoanAmount /
                        emiData?.totalAmountPayable) *
                      100
                    }
                    size={120}
                    strokeWidth={15}
                    strokeColor="#D5BEFC"
                    bgColor="#F3C168"
                  />
                )}
              </div>
            </div>

            {/* Total principal loan and interest payable */}
            <div className="total_principal_loan_and_interest_payable_container">
              <div className="principal_and_interest">
                {/* principal amount */}
                <div className="amount_details">
                  <div className="amt_label">
                    <div className="amt_color principal_color"></div>
                    {t("VEHICLE_DETAILS.EMI_CALCULATOR.PRINCIPAL_LOAN_AMOUNT")}
                  </div>
                  <div className="value">
                    ₹
                    {loading ? (
                      <CustomSkeleton width={80} height={15} />
                    ) : (
                      getFormattedCurrency(emiData?.principalLoanAmount) || "--"
                    )}
                  </div>
                </div>

                {/* Total interest */}
                <div className="amount_details">
                  <div className="amt_label">
                    <div className="amt_color interest_color"></div>
                    {t("VEHICLE_DETAILS.EMI_CALCULATOR.TOTAL_INTEREST_PAYABLE")}
                  </div>
                  <div className="value">
                    ₹
                    {loading ? (
                      <CustomSkeleton width={80} height={15} />
                    ) : (
                      getFormattedCurrency(emiData?.totalInterestPayable) ||
                      "--"
                    )}
                  </div>
                </div>
              </div>

              <div className="total_amount_payable">
                <div>
                  {t("VEHICLE_DETAILS.EMI_CALCULATOR.TOTAL_AMOUNT_PAYABLE")}
                </div>
                <div>
                  ₹
                  {loading ? (
                    <CustomSkeleton width={100} height={15} />
                  ) : (
                    getFormattedCurrency(emiData?.totalAmountPayable) || "--"
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EMI Calculator */}
          <div className="emi_calculation">
            <HorizontalProgressCard
              progress_label={t("VEHICLE_DETAILS.EMI_CALCULATOR.INTEREST_RATE")}
              min_value={10}
              max_value={30}
              stepSize={1}
              suffix="%"
              selected_value={emiValues.interestRate}
              onChange={(value) =>
                updateEmiValues("interestRate", value, vehicle_value)
              }
            />
            <HorizontalProgressCard
              progress_label={t("VEHICLE_DETAILS.EMI_CALCULATOR.LOAN_AMOUNT")}
              min_value={50000}
              max_value={vehicle_value * 0.9}
              stepSize={1000}
              prefix="₹"
              selected_value={emiValues.loanAmount}
              onChange={(value) =>
                updateEmiValues("loanAmount", value, vehicle_value)
              }
            />
            <HorizontalProgressCard
              progress_label={t("VEHICLE_DETAILS.EMI_CALCULATOR.DOWN_PAYMENT")}
              min_value={vehicle_value * 0.1}
              max_value={vehicle_value - 100000}
              stepSize={1000}
              prefix="₹"
              selected_value={emiValues.downPayment}
              onChange={(value) =>
                updateEmiValues("downPayment", value, vehicle_value)
              }
            />
            <HorizontalProgressCard
              progress_label={t("VEHICLE_DETAILS.EMI_CALCULATOR.LOAN_DURATION")}
              min_value={12}
              max_value={48}
              stepSize={12}
              suffix={t("VEHICLE_DETAILS.EMI_CALCULATOR.MONTHS")}
              selected_value={emiValues.loanTenureInMonths}
              onChange={(value) =>
                updateEmiValues("loanTenureInMonths", value, vehicle_value)
              }
            />

            {/* Check eligibility btn */}
            {/* <button className="btn secondary_btn full_width_btn">
              Check eligibility
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;

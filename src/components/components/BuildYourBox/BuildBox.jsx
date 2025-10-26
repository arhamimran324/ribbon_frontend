"use client";

import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import SelectYourBox from "./SelectYourBox";
import ChooseItems from "./ChooseItems";
import ChooseCard from "./ChooseCard";
import Done from "./Done";
import NoSsr from "react-no-ssr";

const steps = [
  { label: "Select your box" },
  { label: "Items" },
  { label: "STEP 3" },
  { label: "DONE" },
];

const BuildBox = () => {
  const [activeStep, setActiveStep] = useState(0);

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <SelectYourBox next={() => setActiveStep(1)} />;
      case 1:
        return (
          <ChooseItems
            next={() => setActiveStep(2)}
            back={() => setActiveStep(0)}
          />
        );
      case 2:
        return (
          <ChooseCard
            next={() => setActiveStep(3)}
            back={() => setActiveStep(1)}
          />
        );
      case 3:
        return <Done back={() => setActiveStep(0)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <NoSsr>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          styleConfig={{
            activeBgColor: "#000000",
            activeTextColor: "#ffffff",
            completedBgColor: "#000000",
            completedTextColor: "#ffffff",
            inactiveBgColor: "#ffffff",
            inactiveTextColor: "#000000",
            size: "1.5em",
          }}
          connectorStateColors={true}
          connectorStyleConfig={{
            completedColor: "#000000",
            activeColor: "#000000",
            disabledColor: "#e0e0e0",
            size: 2,
            style: "solid",
          }}
          className="w-[80%] "
        />
      </NoSsr>
      <div>{renderStepComponent()}</div>
    </div>
  );
};

export default BuildBox;

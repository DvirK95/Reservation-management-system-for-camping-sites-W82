import React from 'react';
// import { useLocation } from 'react-router-dom';

import "./ProcessStep.css";


const ProcessStep = ({steps, currentStep }) => {
  return (
    <div className="progress-indicator">
      {steps.map((step, index) => {
        const stepClass = `test step-${index} ${index === currentStep ? 'active' : ''}`;
        const numClass = `step-num ${index === currentStep ? 'num-active' : ''}`;

        return (
          <div className={stepClass} key={step.path}>
            <div className={numClass}>{step.num}</div>
            <div className="step">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessStep;

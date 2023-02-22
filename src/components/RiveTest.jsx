// import Rive from '@rive-app/react-canvas';

import { useEffect, useState } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

export default function WizardII() {
  const { rive, RiveComponent } = useRive({
    src: "wizardv2.riv",
    autoplay: true,
    stateMachines: "statemachine",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    artboard: "Wizard_III"
  });

  // console.log(rive)

  const [maxWidth, setMaxWidth] = useState();
  const [maxHeight, setMaxHeight] = useState();

  const xAxisInput = useStateMachineInput(rive, "statemachine", "xAxis", 60);
  const yAxisInput = useStateMachineInput(rive, "statemachine", "yAxis", 40);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      const bodyRect = body.getBoundingClientRect();
      setMaxWidth(bodyRect.right);
      setMaxHeight(bodyRect.bottom);
    }
  }, []);

  useEffect(() => {
    const update = (e) => {
      if (maxWidth && maxHeight && yAxisInput && xAxisInput) {
        xAxisInput.value = (e.x / maxWidth) * 100;
        yAxisInput.value = 100 - (e.y / maxHeight) * 100;
      }
    };
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, [xAxisInput, yAxisInput, maxHeight, maxWidth]);

  return (
    <div className="RiveApp">
      <RiveComponent className="full-screen" />
    </div>
  );
}

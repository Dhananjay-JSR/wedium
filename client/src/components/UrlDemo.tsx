import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import React from "react";

export const UrlDemo = ({ isActive }: { isActive: boolean; }) => {
  const STATE_MACHINE = "State Machine ";
  const SWITCh = "Trigger 1";
  const { rive, RiveComponent } = useRive({
    src: "rocket_launch_refresh.riv",
    autoplay: true,
    animations: "All",
    stateMachines: STATE_MACHINE,
  });

  const STATE = useStateMachineInput(rive, STATE_MACHINE, SWITCh);
  React.useEffect(() => {
    if (isActive == true) {
      if (rive && STATE) {
        STATE?.fire();
      }
    }
  }, [isActive]);

  return (
    <>
      <RiveComponent />
    </>
  );
};

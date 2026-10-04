import React from "react";
import { Sky } from "@react-three/drei";

/**
 * ============================================================
 * DAIP DIGITAL TWIN
 * REALISTIC DAYTIME SKY
 *
 * Natural blue daytime environment.
 * No artificial cloud geometry.
 * No additional sun sphere.
 * ============================================================
 */

const RealisticSky: React.FC = () => {
  return (
    <Sky
      distance={450000}
      sunPosition={[80, 55, 100]}
      inclination={0.48}
      azimuth={0.25}
      turbidity={2.2}
      rayleigh={1.4}
      mieCoefficient={0.0025}
      mieDirectionalG={0.7}
    />
  );
};

export default RealisticSky;
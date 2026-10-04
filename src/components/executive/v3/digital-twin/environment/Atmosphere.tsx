import React from "react";

const Atmosphere: React.FC = () => {
  return (
    <fog
      attach="fog"
      args={["#a9c9dc", 65, 150]}
    />
  );
};

export default Atmosphere;
import React from "react";
import CommercialBuilding from "../buildings/CommercialBuilding";
import OfficeBuilding from "../buildings/OfficeBuilding";

const DevelopmentDistrict: React.FC = () => {
  return (
    <group position={[-3.35, 0, -2.55]}>
      {/* ============================================================
          DEVELOPMENT DISTRICT BASE
         ============================================================ */}

      <mesh
        position={[0, 0.045, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[4.7, 3.9]} />

        <meshStandardMaterial
          color="#102f42"
          roughness={0.78}
          metalness={0.22}
        />
      </mesh>

      {/* ============================================================
          DEVELOPMENT / PROJECT BUILDINGS
         ============================================================ */}

      <OfficeBuilding
        position={[-1.25, 0, -0.95]}
        scale={1.05}
        rotation={-0.08}
      />

      <CommercialBuilding
        position={[0.15, 0, -1.0]}
        scale={0.92}
        rotation={0.05}
      />

      <OfficeBuilding
        position={[1.35, 0, -0.65]}
        scale={0.82}
        rotation={-0.04}
      />

      <CommercialBuilding
        position={[-1.35, 0, 0.72]}
        scale={0.72}
        rotation={0.05}
      />

      <OfficeBuilding
        position={[0, 0, 0.82]}
        scale={0.65}
        rotation={-0.05}
      />

      <CommercialBuilding
        position={[1.35, 0, 0.82]}
        scale={0.58}
        rotation={0.08}
      />

      {/* ============================================================
          DEVELOPMENT PLAZA
         ============================================================ */}

      <mesh
        position={[0, 0.052, 1.55]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[3.4, 0.65]} />

        <meshStandardMaterial
          color="#173b50"
          roughness={0.72}
          metalness={0.28}
        />
      </mesh>
    </group>
  );
};

export default DevelopmentDistrict;
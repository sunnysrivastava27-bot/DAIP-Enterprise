import React from "react";

import SchoolBuilding from "../buildings/SchoolBuilding";
import CollegeBuilding from "../buildings/CollegeBuilding";
import UniversityBuilding from "../buildings/UniversityBuilding";

const EducationDistrict: React.FC = () => {
  return (
    <group position={[3.65, 0, 3.35]}>
      {/* =========================================================
          EDUCATION DISTRICT LAND
      ========================================================= */}

      <mesh
        position={[0, 0.055, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[4.6, 4.0]} />

        <meshStandardMaterial
          color="#102f3f"
          roughness={0.82}
          metalness={0.2}
        />
      </mesh>

      {/* =========================================================
          INTERNAL EDUCATION ROAD
      ========================================================= */}

      <mesh
        position={[0, 0.068, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.62, 3.7]} />

        <meshStandardMaterial
          color="#081d2b"
          roughness={0.9}
          metalness={0.08}
        />
      </mesh>

      {/* =========================================================
          SCHOOL ZONE — LOW RISE
      ========================================================= */}

      <group position={[-1.45, 0, 1.15]}>
        <SchoolBuilding
          position={[0, 0, 0]}
          scale={0.82}
          rotation={0}
        />

        {/* School playground */}

        <mesh
          position={[0, 0.075, 1.0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.55, 0.82]} />

          <meshStandardMaterial
            color="#07554a"
            roughness={0.92}
          />
        </mesh>

        {/* Playground center */}

        <mesh
          position={[0, 0.085, 1.0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.28, 0.34, 24]} />

          <meshBasicMaterial
            color="#19b8a1"
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* =========================================================
          COLLEGE ZONE — MID RISE
      ========================================================= */}

      <group position={[1.35, 0, 1.0]}>
        <CollegeBuilding
          position={[0, 0, 0]}
          scale={0.82}
          rotation={-0.12}
        />

        {/* College courtyard */}

        <mesh
          position={[0, 0.078, -0.98]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.55, 0.55]} />

          <meshStandardMaterial
            color="#164456"
            roughness={0.82}
            metalness={0.18}
          />
        </mesh>

        {/* Courtyard green */}

        <mesh
          position={[0, 0.09, -0.98]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.22, 20]} />

          <meshStandardMaterial
            color="#08725a"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* =========================================================
          UNIVERSITY — LARGER LANDMARK
      ========================================================= */}

      <group position={[0.0, 0, -1.25]}>
        <UniversityBuilding
          position={[0, 0, 0]}
          scale={0.92}
          rotation={0}
        />

        {/* University entrance plaza */}

        <mesh
          position={[0, 0.075, 1.18]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.05, 0.62]} />

          <meshStandardMaterial
            color="#173f52"
            roughness={0.78}
            metalness={0.2}
          />
        </mesh>

        {/* University central green */}

        <mesh
          position={[0, 0.088, -0.62]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.48, 24]} />

          <meshStandardMaterial
            color="#07594d"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* =========================================================
          EDUCATION GREEN CORRIDOR
      ========================================================= */}

      {[
        [-1.85, 0.08, -0.15],
        [1.85, 0.08, -0.15],
        [-1.75, 0.08, -1.75],
        [1.7, 0.08, -1.75],
      ].map(([x, y, z], index) => (
        <group
          key={index}
          position={[x, y, z]}
        >
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.28, 18]} />

            <meshStandardMaterial
              color="#075b4c"
              roughness={0.92}
            />
          </mesh>

          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.11, 10, 8]} />

            <meshStandardMaterial
              color="#159b78"
              roughness={0.86}
            />
          </mesh>

          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry
              args={[0.028, 0.04, 0.16, 8]}
            />

            <meshStandardMaterial
              color="#214b38"
              roughness={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* =========================================================
          EDUCATION DISTRICT SIDE WALK
      ========================================================= */}

      <mesh
        position={[-2.08, 0.072, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.22, 3.5]} />

        <meshStandardMaterial
          color="#1d4a5d"
          roughness={0.82}
          metalness={0.16}
        />
      </mesh>

      <mesh
        position={[2.08, 0.072, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.22, 3.5]} />

        <meshStandardMaterial
          color="#1d4a5d"
          roughness={0.82}
          metalness={0.16}
        />
      </mesh>
    </group>
  );
};

export default EducationDistrict;
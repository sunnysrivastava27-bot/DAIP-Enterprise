import React from "react";

/* ============================================================
   CIVIC DISTRICT
   Institutional / Government Quarter
   ============================================================ */

const CivicDistrict: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>

      {/* =========================================================
          CIVIC DISTRICT FOUNDATION
      ========================================================= */}

      <mesh
        position={[0, 0.045, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[4.25, 3.75]} />

        <meshStandardMaterial
          color="#102f42"
          roughness={0.78}
          metalness={0.22}
        />
      </mesh>


      {/* =========================================================
          FORMAL CIVIC PLAZA
      ========================================================= */}

      <mesh
        position={[0, 0.065, 0.72]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.75, 1.05]} />

        <meshStandardMaterial
          color="#1a4257"
          roughness={0.74}
          metalness={0.25}
        />
      </mesh>


      {/* =========================================================
          CENTRAL GOVERNMENT HEADQUARTERS
          Primary landmark of the civic district
      ========================================================= */}

      <group position={[0, 0, -0.25]}>

        {/* Main podium */}

        <mesh
          castShadow
          position={[0, 0.42, 0]}
        >
          <boxGeometry args={[2.25, 0.72, 1.62]} />

          <meshStandardMaterial
            color="#21475f"
            roughness={0.44}
            metalness={0.5}
            emissive="#075875"
            emissiveIntensity={0.12}
          />
        </mesh>


        {/* Upper government block */}

        <mesh
          castShadow
          position={[0, 0.94, 0]}
        >
          <boxGeometry args={[1.68, 0.48, 1.22]} />

          <meshStandardMaterial
            color="#28566d"
            roughness={0.42}
            metalness={0.48}
            emissive="#086581"
            emissiveIntensity={0.12}
          />
        </mesh>


        {/* Central dome */}

        <mesh
          castShadow
          position={[0, 1.38, 0]}
        >
          <sphereGeometry
            args={[
              0.42,
              24,
              12,
              0,
              Math.PI * 2,
              0,
              Math.PI / 2,
            ]}
          />

          <meshStandardMaterial
            color="#55d9ee"
            emissive="#16bcd7"
            emissiveIntensity={0.32}
            metalness={0.68}
            roughness={0.24}
          />
        </mesh>


        {/* Dome base */}

        <mesh position={[0, 1.29, 0]}>
          <cylinderGeometry
            args={[0.46, 0.46, 0.1, 32]}
          />

          <meshStandardMaterial
            color="#326f88"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>


        {/* Digital communication mast */}

        <mesh position={[0, 1.82, 0]}>
          <cylinderGeometry
            args={[0.035, 0.035, 0.65, 10]}
          />

          <meshBasicMaterial color="#72eaff" />
        </mesh>


        {/* Entrance */}

        <mesh position={[0, 0.72, 0.66]}>
          <boxGeometry args={[0.42, 0.48, 0.08]} />

          <meshBasicMaterial
            color="#6beaff"
            transparent
            opacity={0.62}
          />
        </mesh>


        {/* Front steps */}

        <mesh position={[0, 0.08, 0.83]}>
          <boxGeometry args={[0.82, 0.12, 0.34]} />

          <meshStandardMaterial
            color="#28576c"
            roughness={0.7}
            metalness={0.25}
          />
        </mesh>

      </group>


      {/* =========================================================
          MUNICIPAL / CIVIC HALL
      ========================================================= */}

      <group position={[-1.45, 0, -0.35]}>

        <mesh
          castShadow
          position={[0, 0.42, 0]}
        >
          <boxGeometry args={[0.78, 0.78, 0.72]} />

          <meshStandardMaterial
            color="#183d53"
            roughness={0.5}
            metalness={0.42}
          />
        </mesh>


        {/* upper civic block */}

        <mesh
          castShadow
          position={[0, 0.82, 0]}
        >
          <boxGeometry args={[0.62, 0.16, 0.58]} />

          <meshStandardMaterial
            color="#24536a"
            roughness={0.45}
            metalness={0.4}
          />
        </mesh>


        {/* civic windows */}

        {[-0.2, 0, 0.2].map((x) => (
          <mesh
            key={x}
            position={[x, 0.48, 0.366]}
          >
            <boxGeometry args={[0.08, 0.2, 0.025]} />

            <meshBasicMaterial color="#35d9ee" />
          </mesh>
        ))}

      </group>


      {/* =========================================================
          ADMINISTRATIVE OFFICE
      ========================================================= */}

      <group position={[1.45, 0, -0.35]}>

        <mesh
          castShadow
          position={[0, 0.52, 0]}
        >
          <boxGeometry args={[0.82, 1.02, 0.72]} />

          <meshStandardMaterial
            color="#1b4359"
            roughness={0.48}
            metalness={0.44}
          />
        </mesh>


        {/* rooftop cap */}

        <mesh position={[0, 1.06, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.8]} />

          <meshStandardMaterial
            color="#28566c"
            metalness={0.45}
            roughness={0.4}
          />
        </mesh>


        {/* windows */}

        {[-0.2, 0, 0.2].map((x) => (
          <mesh
            key={x}
            position={[x, 0.6, 0.366]}
          >
            <boxGeometry args={[0.08, 0.24, 0.025]} />

            <meshBasicMaterial color="#35d9ee" />
          </mesh>
        ))}


        {/* rooftop beacon */}

        <mesh position={[0, 1.22, 0]}>
          <cylinderGeometry
            args={[0.025, 0.025, 0.25, 8]}
          />

          <meshBasicMaterial color="#69eaff" />
        </mesh>

      </group>


      {/* =========================================================
          PUBLIC SERVICE / AUTHORITY BUILDING
      ========================================================= */}

      <group position={[-1.35, 0, 0.95]}>

        <mesh
          castShadow
          position={[0, 0.34, 0]}
        >
          <boxGeometry args={[0.92, 0.58, 0.62]} />

          <meshStandardMaterial
            color="#1a4055"
            roughness={0.52}
            metalness={0.38}
          />
        </mesh>


        <mesh position={[0, 0.67, 0]}>
          <boxGeometry args={[0.98, 0.08, 0.68]} />

          <meshStandardMaterial
            color="#27556b"
            roughness={0.45}
            metalness={0.4}
          />
        </mesh>


        {[-0.25, 0, 0.25].map((x) => (
          <mesh
            key={x}
            position={[x, 0.4, 0.316]}
          >
            <boxGeometry args={[0.1, 0.16, 0.025]} />

            <meshBasicMaterial color="#31cfe7" />
          </mesh>
        ))}

      </group>


      {/* =========================================================
          CIVIC COURT / INSTITUTIONAL BUILDING
      ========================================================= */}

      <group position={[1.35, 0, 0.95]}>

        <mesh
          castShadow
          position={[0, 0.48, 0]}
        >
          <boxGeometry args={[0.94, 0.82, 0.64]} />

          <meshStandardMaterial
            color="#1c455a"
            roughness={0.48}
            metalness={0.4}
          />
        </mesh>


        {/* institutional roof */}

        <mesh position={[0, 0.92, 0]}>
          <boxGeometry args={[1.02, 0.1, 0.72]} />

          <meshStandardMaterial
            color="#28586d"
            roughness={0.44}
            metalness={0.42}
          />
        </mesh>


        {/* entrance */}

        <mesh position={[0, 0.38, 0.326]}>
          <boxGeometry args={[0.22, 0.3, 0.03]} />

          <meshBasicMaterial
            color="#61e7f4"
            transparent
            opacity={0.58}
          />
        </mesh>

      </group>


      {/* =========================================================
          CIVIC CENTRAL WALKWAY
      ========================================================= */}

      <mesh
        position={[0, 0.072, 1.25]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.72, 1.45]} />

        <meshStandardMaterial
          color="#0b2232"
          roughness={0.88}
          metalness={0.12}
        />
      </mesh>


      {/* =========================================================
          APPROACH ROAD
      ========================================================= */}

      <mesh
        position={[0, 0.068, 2.02]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.15, 0.72]} />

        <meshStandardMaterial
          color="#071a29"
          roughness={0.92}
          metalness={0.08}
        />
      </mesh>


      {/* =========================================================
          CIVIC PLAZA LIGHTS
      ========================================================= */}

      {[
        [-0.92, 0.14, 0.72],
        [0.92, 0.14, 0.72],
        [-0.92, 0.14, 1.35],
        [0.92, 0.14, 1.35],
      ].map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>

          <mesh>
            <cylinderGeometry
              args={[0.025, 0.025, 0.28, 8]}
            />

            <meshStandardMaterial
              color="#274d5f"
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>

          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.045, 10, 8]} />

            <meshBasicMaterial color="#5eeaff" />
          </mesh>

        </group>
      ))}


      {/* =========================================================
          LANDSCAPED CIVIC AREAS
      ========================================================= */}

      {[
        [-1.05, 0.075, 1.78],
        [1.05, 0.075, 1.78],
      ].map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>

          {/* green island */}

          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.36, 24]} />

            <meshStandardMaterial
              color="#075b4d"
              roughness={0.9}
            />
          </mesh>


          {/* tree trunk */}

          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry
              args={[0.035, 0.05, 0.26, 8]}
            />

            <meshStandardMaterial
              color="#214b38"
              roughness={0.9}
            />
          </mesh>


          {/* tree crown */}

          <mesh position={[0, 0.31, 0]}>
            <sphereGeometry
              args={[0.15, 12, 10]}
            />

            <meshStandardMaterial
              color="#159b78"
              roughness={0.85}
            />
          </mesh>

        </group>
      ))}


      {/* =========================================================
          CIVIC FLAG / DIGITAL MARKER
      ========================================================= */}

      <mesh position={[0, 0.25, 1.72]}>
        <cylinderGeometry
          args={[0.018, 0.018, 0.5, 8]}
        />

        <meshBasicMaterial color="#4edff2" />
      </mesh>


      {/* =========================================================
          DISTRICT EDGE ACCENT
      ========================================================= */}

      <mesh
        position={[0, 0.08, -1.78]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[3.6, 0.035]} />

        <meshBasicMaterial
          color="#087c9c"
          transparent
          opacity={0.5}
        />
      </mesh>

    </group>
  );
};

export default CivicDistrict;
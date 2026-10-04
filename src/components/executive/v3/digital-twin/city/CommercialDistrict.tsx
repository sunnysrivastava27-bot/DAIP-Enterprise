import React from "react";
import CommercialBuilding from "../CommercialBuilding";

const CommercialDistrict: React.FC = () => {
    return (
        <group position={[3.35, 0, -2.55]}>
            {/* ============================================================
               COMMERCIAL DISTRICT BASE
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
               COMMERCIAL BUILDINGS
               ============================================================ */}

            {/* High-rise commercial tower */}
            <CommercialBuilding
                position={[-1.25, 0, -0.95]}
                scale={1.15}
                rotation={-0.08}
            />

            {/* Central office tower */}
            <CommercialBuilding
                position={[0.25, 0, -1.05]}
                scale={0.95}
                rotation={0.06}
            />

            {/* Mid-rise office */}
            <CommercialBuilding
                position={[1.35, 0, -0.65]}
                scale={0.78}
                rotation={-0.04}
            />

            {/* Front commercial building */}
            <CommercialBuilding
                position={[-1.35, 0, 0.75]}
                scale={0.72}
                rotation={0.05}
            />

            {/* Retail / mixed-use building */}
            <CommercialBuilding
                position={[0, 0, 0.85]}
                scale={0.62}
                rotation={-0.05}
            />

            {/* Smaller commercial building */}
            <CommercialBuilding
                position={[1.35, 0, 0.85]}
                scale={0.58}
                rotation={0.08}
            />

            {/* ============================================================
               COMMERCIAL PLAZA
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

export default CommercialDistrict;
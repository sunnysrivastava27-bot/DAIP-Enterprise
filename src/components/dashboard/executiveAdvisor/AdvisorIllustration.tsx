import React from "react";
import { Brain } from "lucide-react";

const AdvisorIllustration: React.FC = () => {
    return (
        <div
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
>
    <div
        style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
                "linear-gradient(180deg,#0D233A 0%,#112B46 100%)",
            border: "1px solid rgba(0,220,255,.25)",
            boxShadow: "0 0 25px rgba(0,220,255,.15)",
        }}
    >
        <Brain size={34} color="#00D8FF" />
    </div>
</div>
    );
};

export default AdvisorIllustration;
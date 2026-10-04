import React from "react";

interface ExecutiveCardBodyProps {
    children: React.ReactNode;
}

const ExecutiveCardBody: React.FC<ExecutiveCardBodyProps> = ({
    children,
}) => {
    return (
        <div
            className="
                flex-1
                min-h-0
                px-3
                pt-1
                pb-1
                overflow-hidden
                flex
                flex-col
            "
        >
            {children}
        </div>
    );
};

export default ExecutiveCardBody;
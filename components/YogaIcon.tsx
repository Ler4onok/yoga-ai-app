import React from "react";

export const YogaIcon = ({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number | string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v6" />
            <path d="M12 8c-2.5 0-5 2-5 6" />
            <path d="M12 8c2.5 0 5 2 5 6" />
            <path d="M7 14c-1.5 0-3 1.5-3 3 0 2.5 3.5 3.5 8 3.5s8-1 8-3.5c0-1.5-1.5-3-3-3l-5 2z" />
        </svg>
    );
};

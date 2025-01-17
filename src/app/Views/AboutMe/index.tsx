"use client";

import React from 'react';

interface AboutMeComponentProps {
    className?: string | undefined;
}

const Base: React.FC<AboutMeComponentProps> = ({ className }) => {
    return (
        <div className={`${className} relative w-full h-full flex justify-start items-start`}>
            <p>This is the about me page</p>
        </div>
    );
};

export default Base;
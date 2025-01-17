import React from 'react';
import Nav from '../Nav';

interface BaseComponentProps {
    className?: string | undefined;
}

const Base: React.FC<BaseComponentProps> = ({ className }) => {
    return (
        <div className={`${className} relative w-full h-full`}>
            <Nav />
        </div>
    );
};

export default Base;
import React from 'react';

interface LandingProps {
    className?: string | undefined;
}

import './style.css';

const Landing: React.FC<LandingProps> = ({ className }) => {
    return (
        <div className={className}>
            <h1>This is the landing page.</h1>
        </div>
    );
};

export default Landing;
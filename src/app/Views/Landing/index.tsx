import React from 'react';

interface LandingProps {
    className?: string | undefined;
}

import './style.css';

const Landing: React.FC<LandingProps> = ({ className }) => {
    return (
        <div className={`${className} relative`}>
            <h1>CJ D&apos;Autorio</h1>
            
        </div>
    );
};

export default Landing;
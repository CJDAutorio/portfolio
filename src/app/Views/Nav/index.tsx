import React from 'react';

interface NavComponentProps {
    className?: string | undefined;
}

import './style.css';

const Nav: React.FC<NavComponentProps> = ({ className }) => {
    return (
        <div className={`${className} relative w-full h-full flex justify-around`}>
            <button>About Me</button>
            <button>Experience</button>
            <button>Hobbies</button>
            <button>Contact Me</button>
        </div>
    );
};

export default Nav;
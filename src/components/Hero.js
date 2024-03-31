import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import verticalLogo from '../assets/logo-LogoLogiks-vertical.svg';
import horizontalLogo from '../assets/logo-LogoLogiks-horizontal.svg';

const Hero = () => {
    const [logo, setLogo] = useState(window.innerWidth < 700 ? verticalLogo : horizontalLogo);

    useEffect(() => {
        const handleResize = () => {
            // This will ensure the vertical logo is used when the window width is below 700px
            // and the horizontal logo is used when the window width is 700px or greater.
            if (window.innerWidth < 700) {
                setLogo(verticalLogo);
            } else {
                setLogo(horizontalLogo);
            }
        };

        window.addEventListener('resize', handleResize);
        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="hero">
                <img 
                    src={logo} 
                    alt="LogoLogiks Logo" 
                    className="logo" 
                />
            <div className="text-container">
                <h2 className="coming-soon">COMING SOON!</h2>
                <h1>LogoLogiks</h1>
                <p>Nestled in the vibrant city of Vancouver BC, LogoLogiks is a premier and modern logo, branding and web agency. We deliver bespoke design solutions that define user experiences and accessibility through credible brand narration. Our approach weaves your brand's story into every pixel and print, ensuring that your identity isn't just seen — it's felt.</p>
            </div>
        </section>
    );
};

export default Hero;

"use client";

import { useEffect } from 'react';

const BootstrapClientScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js';
    script.integrity = 'sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V';
    script.crossOrigin = 'anonymous';
    script.async = true; // Optional: load script asynchronously

    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render anything
};

export default BootstrapClientScript;
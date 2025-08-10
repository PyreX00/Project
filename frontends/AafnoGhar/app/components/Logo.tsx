'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
    fallbackText?: string;
}

const Logo: React.FC<LogoProps> = ({ 
    src = "/aafnogharlogo.png", 
    alt = "Aafnoghar Logo", 
    width = 50, 
    height = 30,
    className = "",
    fallbackText = "AG"
}) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
        console.warn(`Failed to load logo image: ${src}`);
        setImageError(true);
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    if (imageError) {
        // Fallback to text logo with styling that matches your design
        return (
            <div 
                className={`flex items-center justify-center bg-airbnb text-white rounded-md font-bold ${className}`} 
                style={{ width, height }}
            >
                <span className="text-sm">
                    {fallbackText}
                </span>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            {isLoading && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded"
                    style={{ width, height }}
                >
                    <span className="text-gray-400 text-xs">...</span>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onError={handleError}
                onLoad={handleLoad}
                className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 object-contain`}
                priority
            />
        </div>
    );
};

export default Logo;
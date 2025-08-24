'use client'
import React, { useState, useEffect } from 'react';
import apiService from '@/app/services/apiService';

interface Property {
  id: string;
  image?: string;
  location?: string;
}

interface SingleImageProps {
  property?: Property;
  propertyId?: string;
  imageUrl?: string;
  alt?: string;
}

const containerStyle: React.CSSProperties = {
  height: '60vh',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  boxSizing: 'border-box'
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const SingleImage: React.FC<SingleImageProps> = ({ 
  property, 
  propertyId,
  imageUrl, 
  alt = "Property Image" 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getImageSource = () => {
    // Priority: direct imageUrl prop > property.image > fallback
    if (imageUrl) return imageUrl;
    if (property?.image) {
      // Handle relative paths from API
      if (property.image.startsWith('/')) {
        return `http://localhost:8000${property.image}`;
      }
      return property.image;
    }
    return '/room-1.jpg'; // fallback image
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', getImageSource());
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('❌ Failed to load image:', getImageSource());
    setImageError(true);
    setIsLoading(false);
  };

 
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
  }, [property?.id, property?.image, propertyId, imageUrl]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn('Image loading timeout after 8 seconds:', getImageSource());
        setImageError(true);
        setIsLoading(false);
      }
    }, 8000); 

    return () => clearTimeout(timer);
  }, [isLoading]);


    useEffect(() => {
      const imageUrl = getImageSource();
      console.log('🖼️ Loading image:', imageUrl);
      console.log('📦 Property data:', property);
      
      // Test image accessibility with more detailed logging
      const testImg = new Image();
      testImg.onload = () => {
        console.log('✅ Image preload successful');
        // If preload works but main image is still loading, force show it
        setTimeout(() => {
          if (isLoading) {
            console.log('🔄 Preload successful but main image still loading, forcing display');
            setIsLoading(false);
            setImageError(false);
          }
        }, 1000);
      };
      testImg.onerror = () => console.log('❌ Image preload failed');
      testImg.src = imageUrl;
    }, [property, propertyId, imageUrl, isLoading]);

  // Loading state
  if (isLoading && !imageError) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          ...containerStyle, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #e5e7eb', 
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </div>
    );
  }

 
  if (imageError) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          ...containerStyle, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
            Image not available
          </p>
          <button 
            onClick={() => {
              setImageError(false);
              setIsLoading(true);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <img 
        src={getImageSource()}
        alt={alt}
        style={imageStyle} 
        className='hover:scale-103 transition-transform duration-300'
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="eager" 
        onLoadStart={() => console.log('🔄 Image load started')}
      />
    </div>
  );
};

export default SingleImage;

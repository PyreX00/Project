import React from 'react';
import apiService from '@/app/services/apiService';


const containerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',

  gap: 0,
  height: '60vh',
  boxSizing:'border-box'
};

const imgCellStyle = (area: string): React.CSSProperties => ({
  gridArea: area,
  overflow: 'hidden',     // ensures cropping when necessary
  position: 'relative',   // useful if switching to next/image fill later
});

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  margin:'5px',
};


const GridLayoutInlineImages: React.FC = () => (
  <div style={containerStyle}>
    <div style={imgCellStyle('1 / 1 / 6 / 4')}>
      <img src="/room-1.jpg" alt="Image 1" style={imageStyle} 
      className='hover:scale-103' 
      />
    </div>
    {/* repeat for other cells */}
    <div style={imgCellStyle('1 / 4 / 4 / 6')}>
      <img src="/room-1.jpg" alt="Image 2" style={imageStyle}
      className='hover:scale-103' 
       />
    </div>
    <div style={imgCellStyle('4 / 4 / 6 / 5')}>
      <img src="/room-1.jpg" alt="Image 3" style={imageStyle} 
      className='hover:scale-103' 
      />
    </div>
    <div style={imgCellStyle('4 / 5 / 6 / 6')}>
      <img src="/room-1.jpg" alt="Image 4" style={imageStyle}
      className='hover:scale-103' 
       />
    </div>
  </div>
);

export default GridLayoutInlineImages;

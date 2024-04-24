// ImageView.js
import React from 'react';

function ImageView({ images, onSelectImage }) {
  const handleImageClick = (image) => {
    onSelectImage(image);
  };

  return (
    <div>
      <h2>Image View</h2>
      <div className="image-menu">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={image.location_name}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageView;

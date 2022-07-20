import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images, handleImgOpenClick }) => {
  return (
    <div>
      <ul className={css.ImageGallery}>
        {images.map(({ webformatURL, tags, id, largeImageURL }) => (
          <ImageGalleryItem
            webformatURL={webformatURL}
            tags={tags}
            key={id}
            largeImageURL={largeImageURL}
            handleImgOpenClick={handleImgOpenClick}
          />
        ))}
      </ul>
    </div>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  handleImgOpenClick: PropTypes.func.isRequired,
};

export default ImageGallery;

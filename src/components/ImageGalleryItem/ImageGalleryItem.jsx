import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  onHandleImgOpenClick,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        onClick={() => {
          onHandleImgOpenClick(largeImageURL, tags);
        }}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

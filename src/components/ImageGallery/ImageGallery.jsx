import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';

import Button from '../Button/';
import Loader from '../Loader';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import Title from '../Title';

import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '19081920-2c3ac78229fa04ecd1a30d4e6';
class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    totalImages: 0,
    largeImageUrl: '',
    tag: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevProps.images !== this.props.images || page !== prevState.page) {
      try {
        this.setState({
          status: 'pending',
          error: null,
          images: [],
        });
        const res = await fetch(
          BASE_URL +
            `image_type=photo&orientation=horizontal&q=${this.props.images}&page=${page}&per_page=12&key=` +
            KEY
        );

        const data = await res.json();
        const images = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        const totalImages = data.totalHits;

        if (images.length === 0) {
          this.setState({ status: 'rejected' });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            totalImages,
            status: 'resolved',
          }));
        }
      } catch (error) {
        console.log('error');
      }
    }
  }

  handleImgOpenClick = (largeImageUrl, tag) => {
    this.setState({ largeImageUrl, tag });
    this.props.onToggleModal();
  };

  LoadMoreButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, largeImageUrl, tag, status } = this.state;

    if (status === 'idle') {
      return <Title />;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <ErrorMessage images={this.props.images} />;
    }

    return (
      <div>
        <ul className={css.ImageGallery}>
          {images &&
            images.map(({ webformatURL, tags, id, largeImageURL }) => (
              <ImageGalleryItem
                webformatURL={webformatURL}
                tags={tags}
                key={id}
                largeImageURL={largeImageURL}
                onHandleImgOpenClick={this.handleImgOpenClick}
              />
            ))}
          {this.props.showModal && largeImageUrl && (
            <Modal onClose={this.props.onToggleModal}>
              <img src={largeImageUrl} alt={tag} width="800" />
            </Modal>
          )}
        </ul>
        {images && <Button onLoadMoreButtonClick={this.LoadMoreButtonClick} />}
      </div>
    );
  }
}

export default ImageGallery;

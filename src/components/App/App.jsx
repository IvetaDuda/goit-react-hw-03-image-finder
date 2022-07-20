import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button/';
import Loader from '../Loader';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessage';
import Title from '../Title';

const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '19081920-2c3ac78229fa04ecd1a30d4e6';
class App extends Component {
  state = {
    image: '',
    showModal: false,
    images: [],
    page: 1,
    status: 'idle',
    totalImages: 0,
    largeImageUrl: '',
    tag: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, image } = this.state;

    if (prevState.image !== image || page !== prevState.page) {
      try {
        this.setState({
          status: 'pending',
          error: null,
          images: [],
        });
        const res = await fetch(
          BASE_URL +
            `image_type=photo&orientation=horizontal&q=${image}&page=${page}&per_page=12&key=` +
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

  hendelFormSubmit = image => {
    this.setState({ image });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleImgOpenClick = (largeImageUrl, tag) => {
    this.setState({ largeImageUrl, tag });
    this.toggleModal();
  };

  LoadMoreButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { image, showModal, images, largeImageUrl, tag, status } = this.state;

    return (
      <>
        <Searchbar onFormSubmit={this.hendelFormSubmit} />
        {status === 'idle' && <Title />}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <ErrorMessage images={image} />}
        {status === 'resolved' && (
          <ImageGallery
            images={images}
            onToggleModal={this.toggleModal}
            showModal={showModal}
            handleImgOpenClick={this.handleImgOpenClick}
          />
        )}
        {status === 'resolved' && (
          <Button onLoadMoreButtonClick={this.LoadMoreButtonClick} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageUrl} alt={tag} width="800" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
export default App;

import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

class App extends Component {
  state = {
    images: '',
    showModal: false,
  };

  hendelFormSubmit = images => {
    this.setState({ images });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, images } = this.state;
    return (
      <>
        <Searchbar onFormSubmit={this.hendelFormSubmit} />
        <ImageGallery
          images={images}
          onToggleModal={this.toggleModal}
          showModal={showModal}
        />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
export default App;

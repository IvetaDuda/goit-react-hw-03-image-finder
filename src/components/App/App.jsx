import React, { Component } from 'react';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
// import Button from '../Button';
// import Loader from '../Loader';
// import Modal from '../Modal';

class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery />
      </>
    );
  }
}
export default App;

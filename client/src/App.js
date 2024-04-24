import Header from './Header';
import Globe from './Globe';
import ImageViewer from "./ImageViewer";
import { useState } from 'react';
import DataFetcher from './DataFetcher';
import imageDataArray from "./data.json" //👈DO NOT MODIFY THIS LINE


function App() {
  const [selectedImage, setSelectedImage] = useState(null); // what is this state variable being used for?
  const [images, setImages] = useState(imageDataArray) //👈DO NOT MODIFY THIS LINE

 


  //Part 4: hmmm.. what do we do here?
  
  return (
    <div className="App">
      <Header />

      {/*DO NOT MODIFY THIS LINE 👇*/}
      <Globe images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />  {/*👈DO NOT MODIFY THIS LINE*/}
      {/*DO NOT MODIFY THIS LINE 👆*/}

      {/* <p>button</p> */}

      <ImageViewer image={selectedImage} setImage={setSelectedImage} />    {/*what props are we passing to this component*/}

      <DataFetcher setImage={setImages} />
  </div>
  );
}

export default App;

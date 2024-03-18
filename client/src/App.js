import './App.css';
import Header from './Header';
import Globe from './Globe';
import imageDataArray from "./data.json"
import ImageViewer from "./ImageViewer";
import { useState } from 'react';
function App() {
  const [selectedImage, setSelectedImage] = useState(null); // what is this state variable being used for?


  return (
    <div className="App">
      <Header />
      <Globe images={imageDataArray} setSelectedImage={setSelectedImage} />  {/*what props are we passing to this component*/}
      <ImageViewer image={selectedImage} setImage={setSelectedImage} />      {/*what props are we passing to this component*/}

  </div>
  );
}

export default App;

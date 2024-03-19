import './App.css';
import Header from './Header';
import Globe from './Globe';
import imageDataArray from "./data.json"
import ImageViewer from "./ImageViewer";
import { useEffect, useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null); // what is this state variable being used for?
  const [images, setImages] = useState(imageDataArray)
  
  useEffect(function(){
    fetch("http://localhost:3001/")
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
        setImages(res)
      })

  }, [])

  
  return (
    <div className="App">
      <Header />

      {/*DO NOT MODIFY THIS LINE 👇*/}
      <Globe images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />  {/*👈DO NOT MODIFY THIS LINE*/}
      {/*DO NOT MODIFY THIS LINE 👆*/}

      <ImageViewer image={selectedImage} setImage={setSelectedImage} />      {/*what props are we passing to this component*/}
  </div>
  );
}

export default App;

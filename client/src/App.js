import './App.css';
import Header from './Header';
import Globe from './Globe';
import ImageViewer from "./ImageViewer";
import { useEffect, useState } from 'react';

import imageDataArray from "./data.json" //👈DO NOT MODIFY THIS LINE


function App() {
  const [selectedImage, setSelectedImage] = useState(null); // what is this state variable being used for?

  const [images, setImages] = useState(imageDataArray) //👈DO NOT MODIFY THIS LINE

useEffect(()=>{
  setTimeout(()=>{
    setSelectedImage(  {
      image_url: "https://images.unsplash.com/photo-1606364394718-93237e7a292c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0MjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDY0MDM2NjJ8&ixlib=rb-4.0.3&q=80&w=1080",
      location_name: "Smoky Mountain, Tennessee, USA",
      latitude: 36.18369,
      longitude: -84.402711
    })
  }, 2000)
},[])

  
  return (
    <div className="App">
      <Header />

      {/*DO NOT MODIFY THIS LINE 👇*/}
      <Globe images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />  {/*👈DO NOT MODIFY THIS LINE*/}
      {/*DO NOT MODIFY THIS LINE 👆*/}

      <ImageViewer image={selectedImage} setImage={setSelectedImage} />    {/*what props are we passing to this component*/}
  </div>
  );
}

export default App;

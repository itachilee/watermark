import { useState } from 'react'

import './App.css'
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';


function App() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <>
      <div>
        {!image ? (
          <ImageUploader onImageUpload={setImage} />
        ) : (
          <ImageEditor image={image} />
        )}
      </div>
    </>
  )
}

export default App

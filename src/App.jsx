import React, { useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

export default function App() {
  const [prediction, setPred] = useState();
  const [score, setScore] = useState();

  const imgRef = useRef(null);
  const [loader, setLoader] = useState(false);

  const classifyDate = async () => {
    setLoader(true);
    const model = await cocoSsd.load();
    const predictions = await model.detect(imgRef.current); 
    setScore(Math.round(predictions[0].score*100))
    setPred(predictions[0]?.class ? predictions[0].class : "No prediction");
    setLoader(false);
  };

  return (
    <div>
      <h1>Using cocoSsd</h1>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files[0]) {
            imgRef.current.src = URL.createObjectURL(event.target.files[0]);
          }
        }}
      />
      <img
        ref={imgRef}
        width={500}
        alt=""
      />
      <button onClick={classifyDate}>check the img...</button>
      {loader ? <p>still loading...</p> : prediction && <p>Result: {prediction}  {score}%</p>}
    </div>
  );
}

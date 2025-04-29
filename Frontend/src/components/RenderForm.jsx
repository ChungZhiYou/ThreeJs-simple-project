import React from 'react'
import { useState } from 'react';
import ThreeRenderer from './ThreeRenderer';

const RenderForm = () => {

  const [radius, setRadius] = useState(1);
  const [width, setWidth] = useState(1);
  const [length, setLength] = useState(1);
  const [height, setHeight] = useState(1);
  const [shape, setShape] = useState(1);

  
  const [inputWidth, setInputWidth] = useState('');
  const [inputLength, setInputLength] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const [inputRadius, setInputRadius] = useState('');

  const handleRadiusSubmit = (e) => {
    e.preventDefault();
    // alert(`Radius submitted: ${radius}`);
    
  };

  const handleDimensionsSubmit = (e) => {
    console.log(submitted)
    e.preventDefault();
    // alert(`Dimensions submitted:\nWidth: ${width}\nLength: ${length}\nHeight: ${height}`);
    // set
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' , marginLeft: '200px', marginRight: '200px'}}>
      <h1>Render your own 3d model</h1>
      <div style={{ margin: '20px' }}>
        <button onClick={() => {setShape('sphere')}}>Circle</button>
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setShape('rectangle')}>Box</button>
      </div>
      {shape === 'sphere' ?
      <div  style={{ marginBottom: '40px' }}>
        <h2>Enter Radius</h2>
        <input
          type="number"
          value={inputRadius}
          onChange={(e) => setInputRadius(e.target.value)}
          placeholder="Enter radius"
          required
          style={{ marginRight: '10px' }}
        />
        {/* <button type="submit">Submit Radius</button> */}
        <button onClick={() => setRadius(inputRadius)}>Submit Dimensions</button>
      </div>
      :
      <div 
        style={{ marginBottom: '40px' }}>
        <h2>Enter Width, Length, Height</h2>
        <input
          type="number"
          value={inputWidth}
          onChange={(e) => setInputWidth(e.target.value)}
          placeholder="Width"
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          value={inputLength}
          onChange={(e) => setInputLength(e.target.value)}
          placeholder="Length"
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          value={inputHeight}
          onChange={(e) => setInputHeight(e.target.value)}
          placeholder="Height"
          required
          style={{ marginRight: '10px' }}
        />
        {/* <button type="submit">Submit Dimensions</button> */}
        <button onClick={() => {
          setHeight(inputHeight)
          setLength(inputLength)
          setWidth(inputWidth)
        }}>Submit Dimensions</button>
      </div>
      }
      <ThreeRenderer
      width={width}
      length={length}
      height={height}
      radius={radius}
      shape={shape}
      />
    </div>
  )
}

export default RenderForm
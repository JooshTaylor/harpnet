import React from 'react';
import spinner from './spinner.gif';

export default function Spinner() {
  return (
    <div>
      <img src={spinner} alt="Loading..." style={{ width: '200px', height: '200px', margin: '20rem auto 25rem', display: 'block', backgroundColor: 'transparent' }} />
    </div>
  )
}

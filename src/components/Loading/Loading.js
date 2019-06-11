import React from 'react';
import './Loading.css'

const Loading = () => (
  <div className="loading-container">
    <div className="picture-container">
      <img className="loading-dog" src={require('../../img/loading.gif')} alt='loading'/>
    </div>  
  </div>
)

export default Loading;
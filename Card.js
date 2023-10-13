import React, { useContext } from 'react';
import './CardStyle.css';
import { ThemeContext } from '../App';

function Card(props) {
  const { theme } = useContext(ThemeContext);
  const handleOnClick = () => {
    props.updateInfoDisplay(props.imgData);
  };

  let size = (Number(props.imgData.sizeInBytes) * 0.000001).toFixed(2);

  return (
    <div className={`card ${theme === 'dark' ? 'dark' : ''}`} onClick={handleOnClick}>
      <img src={props.imgData.url} alt='hellooo' />
      <div className="card-info">
        <div className="fileName">{props?.imgData?.filename}</div>
        <div className='sizeCss'>{size}Mb</div>
      </div>
    </div>
  );
}

export default Card;


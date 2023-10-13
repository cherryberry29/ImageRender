import React, { useContext } from 'react';
import './CLstyle.css';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ThemeContext } from '../App';

export default function InfoDisplay({ info, setFavorited, favorited, updateFilteredCards, Imagedata, deleteImage }) {
  const { theme } = useContext(ThemeContext);

  const changeFav = () => {
    setFavorited(!favorited);
    info.favorited = favorited;
    const updatedFilteredCards = Imagedata.filter((image) => image.favorited);
    updateFilteredCards(updatedFilteredCards);
  }

  const handleDelete = () => {
    deleteImage(info);
  }

  if (!info) {
    return (
      <div className={`information-display ${theme}`}>
        <p>No information available</p>
      </div>
    );
  }

  return (
    <div className={`information-display ${theme}`}>
      <img src={info.url || ''} style={{ height: '17rem', width: "19rem" }} alt="Image not available" />
      <div className="firstline">
        <h3>{info.filename}</h3>
        <div onClick={changeFav}>
          {favorited ? <AiOutlineHeart className='heart' /> : <AiFillHeart className='heart' />}
        </div>
      </div>
      <h4>Information</h4>
      <p>Updated By: {info.uploadedBy}</p>
      <p>Created: {info.createdAt}</p>
      <p>Resolutions: {info.resolution?.height}x{info.resolution?.width}</p>
      <h4>Description</h4>
      <p>{info.description ? info.description : "no description provided"}</p>
      <button type='button' onClick={handleDelete} style={{ width: '100%', height: '3rem', borderRadius: '5px'}}>DELETE</button>
    </div>
  )
}



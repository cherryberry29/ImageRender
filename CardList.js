import React, { useEffect,useContext } from 'react';
import Card from './Card';
import './CLstyle.css';
import { Outlet, Link } from 'react-router-dom'; 
import { ThemeContext } from '../App';


export default function CardList({ Imagedata, updateInfoDisplay,filteredCards, setFilteredCards}) {
  const { theme } = useContext(ThemeContext);
  const pathname = window.location.pathname; // Get the current route pathname
  
  // Filter the cards based on whether the "Favorites" route is active
  useEffect(() => {
    if (pathname === '/favorites') {
      const favorites = Imagedata.filter((image) => image.favorited);
      setFilteredCards(favorites);
    } else {
      setFilteredCards(Imagedata);       
    }
  }, [Imagedata, pathname]);

  return (
    <div className='Main-Page'>
      <div className="card-list">
        {filteredCards.map((image, i) => (
            <Link >
            <Card imgData={image} updateInfoDisplay={updateInfoDisplay}/>
            </Link>
        ))}
      </div>
      <Outlet /> {/* This will render child routes */}
    </div>
  );
}



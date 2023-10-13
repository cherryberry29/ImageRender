import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route as RouteV6 } from 'react-router-dom'; // Import Route as RouteV6
import CardList from './components/CardList';
import InfoDisplay from './components/InfoDisplay';
import Scroll from './components/Scroll';
import './App.css';
import axios from 'axios';
import { BsBrightnessHigh } from "react-icons/bs";
import { PiCloudMoonThin } from "react-icons/pi";

export const ThemeContext = createContext("light");

export default function App() {
  // Load data from local storage or use default data
  const [ImageData, setImageData] = useState([]);
  useEffect(() => {
    const localData = loadDataFromLocalStorage();
    console.log(localData)
    if (localData?.length > 0) { setImageData(localData) }
    else {
      LoadData();
    }
  }, [])
  function LoadData() {
    axios
      .get("https://agencyanalytics-api.vercel.app/images.json")
      .then((response) => {
        setImageData(response.data);
        console.log("this is from api", response.data);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      })
  }

  const [infoDisplayData, setInfoDisplayData] = useState(null);
  const updateInfoDisplay = (newInfo) => {
    setInfoDisplayData(newInfo);
  };

  const [favorited, setFavorited] = useState(infoDisplayData?.favorited);

  const [filteredCards, setFilteredCards] = useState([]);
  const updateFilteredCards = (filteredCards) => {
    setFilteredCards(filteredCards);
  };

  const deleteImage = (imageToDelete) => {
    // Remove the image from ImageData
    const updatedImageData = ImageData.filter((image) => image.id !== imageToDelete.id);

    // Remove the image from filteredCards if it's favorited
    const updatedFilteredCards = filteredCards.filter((image) => {
      if (image.id === imageToDelete.id) {//To remove image from favorited
        image.favorited = false;
      }
      return image.id !== imageToDelete.id;
    });

    // Update both ImageData and filteredCards
    setFilteredCards(updatedFilteredCards);
    setInfoDisplayData(null);
    setImageData(updatedImageData);

    // Update local storage
    saveDataToLocalStorage(updatedImageData);
  };

  useEffect(() => {// Update local storage whenever ImageData changes
    console.log(ImageData);
    saveDataToLocalStorage(ImageData);
  }, [ImageData]);

  function saveDataToLocalStorage(data) {
    localStorage.setItem('ImageData', JSON.stringify(data));
  }

  function loadDataFromLocalStorage() {
    const data = localStorage.getItem('ImageData');
    if (data == "undefined") {
      return null;
    }
    else {
      console.log(data)
      return JSON.parse(data)
    }
  }
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? 'dark' : 'light'))
  }
  return (

    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <div className={theme}>
        <Router>
          <div className={theme}>
            <header >
              <div className='header-top-line'>
                <h1 style={{ fontSize: '2rem', padding: '1rem' }}>Photos Api Calls And Favorites</h1>
                <button type='button' className='themeButton' onClick={toggleTheme}>{theme === 'dark' ? <BsBrightnessHigh style={{ height: '2rem', width: '2rem' }} /> : <PiCloudMoonThin style={{ height: '2rem', width: '2rem' }} />}</button>
              </div>
              <NavLink className="nav " to="/">Recently Added</NavLink>
              <NavLink className="nav" to="/favorites">Favorites</NavLink>

            </header>
            <div className="major-components">
              <Scroll>
                <Routes>
                  <RouteV6 path="/"
                    element={<CardList Imagedata={ImageData}
                      updateInfoDisplay={updateInfoDisplay}
                      filteredCards={filteredCards}
                      setFilteredCards={setFilteredCards} />} />
                  <RouteV6 path="/favorites"
                    element={<CardList Imagedata={ImageData}
                      updateInfoDisplay={updateInfoDisplay}
                      filteredCards={filteredCards}
                      setFilteredCards={setFilteredCards} />} />
                </Routes>
              </Scroll>
              <Scroll>
                <InfoDisplay
                  info={infoDisplayData}
                  setFavorited={setFavorited}
                  favorited={favorited}
                  updateFilteredCards={updateFilteredCards}
                  Imagedata={ImageData}
                  deleteImage={deleteImage}
                />
              </Scroll>
            </div>
          </div>
        </Router>

      </div>
    </ThemeContext.Provider>

  );
}

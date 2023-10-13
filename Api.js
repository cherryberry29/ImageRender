import React, {useState, useEffect} from 'react';
import axios from 'axios';

const count = 1;
function LoadData() {
    const [data , setData] = useState([]);   
    useEffect( () => {
        axios
        .get("https://agencyanalytics-api.vercel.app/images.json")
        .then((response) => {
            setData(response.data); 
            console.log("this is from api",response.data);
        })
        .catch((error)=>{
            console.error("error fetching data:", error);
        })
    }, [count])
    
    return data;
}
export {LoadData};

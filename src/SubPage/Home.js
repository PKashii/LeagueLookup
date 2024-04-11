import "../App.css";
import SearchIcon from "../search.svg";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home()
{
    const [isHovered, setIsHovered] = useState([]);
    return(
        <div className="app">
            <h1 >League Of Legends</h1>

            <div className="search">
                <input 
                placeholder="Search your champion"
                value=""
                onChange={()=>{}}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>{}}
                />
            </div>
            <div className="container">
                <div className="map">
                    
                
                <div
                    className="image-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
    >
                        <img src="https://steamuserimages-a.akamaihd.net/ugc/1613933970484956626/B2F6E1405654192A2A031B79F89B73BB9E2C44B0/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" 
                        alt="Summoners Rift"
                        width="400"
                        height="400"
                        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}

                        /> 
                        
                        
                    </div>
                    <div>
                    
                        <h3>Summoners Rift</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}
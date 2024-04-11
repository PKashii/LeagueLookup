import React from "react";
import "../App.css";
import pfp from './temo.png'

/*const { MongoClient } = require("mongodb");


const uri ="mongodb+srv://cpylink:uCfAbqfXflflMtOe@leaguedata.6lal5ny.mongodb.net/?retryWrites=true&w=majority&appName=LeagueData";
const client = new MongoClient(uri);

let data = [];

async function FetchData() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfuly");
  const database = client.db("league_lookup");
  const coll = database.collection("matches");
  try {
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } finally {
    await client.close();
  }
  console.log(data);
}

FetchData();*/


function Card(){
    return(
        <div className="select">
        <div className="card">
            <img className="cardImg" src={pfp} /*{props.image}*/ alt="ChampionPFP"></img>
            <h2 className="cardTT">Teemo</h2>  
            <p className='cardOP'>Toplaner</p>    
        </div>

        </div>
    )
}
//{props.nazwa}
//{props.opis}
export default Card


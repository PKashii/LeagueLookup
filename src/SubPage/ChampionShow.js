import { useEffect, useState, Component } from "react";
import React from "react";

import "../App.css";
import pfp from './temo.png'
import axios, { Axios } from "axios";

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
function Event()
{
    const [champs, setChamp] =useState([]);
    useEffect(()=> 
{
  axios.get('/Champ/get')
  .then(champ => setChamp(champ.data))
  .catch(err =>console.log(err))
},[])
  
  
  return(
    <div>
        <table>
          <thead>
          <tr>
            <th>
              Champ
            </th>
          </tr>
          </thead>
          <tbody>
            {
              champs.map(champ =>{
                <tr>
                  <td>{champ.championName}</td>
                </tr>
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default Event;
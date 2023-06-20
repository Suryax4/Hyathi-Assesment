import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
const AdoptedPokemon = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    let myHeaders = new Headers();
    let token = sessionStorage.getItem("token")
    myHeaders.append("Authorization",`Bearer ${token}`)
    let reqOptions ={
      method:"GET",
      headers:myHeaders
    }
    let result = await fetch("http://localhost:5010/adoptedpokemon",reqOptions);
    result = await result.json();
    setPokemons(result.list);
  };

  const feedPokemon = async (id) =>{

   
    var myHeaders = new Headers();
    let token = sessionStorage.getItem("token");
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5010/pokemon/feed", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    getPokemons()
  }
    )
  .catch(error => console.log('error', error));


  };

  

  return (
    <div className="product-list">
      <h3>Pokemon List</h3>
      <ul>
        <li>S No.</li>
        <li>Name</li>
        <li>Image</li>
        <li>Breed</li>
        <li>Age</li>
        <li>Health</li>
        <li>Operation</li>
        
      </ul>

      {pokemons.map((pokemon, index) => {
        return (
          <ul key={pokemon._id}>
            <li>{index + 1}</li>
            <li>{pokemon.name}</li>
            <li>
              <img src={pokemon.image} alt="" srcset="" />
            </li>
            <li>{pokemon.breed}</li>
            <li>{pokemon.age}</li>
            <li>{pokemon.health}</li>
            <li><button onClick={()=>feedPokemon(pokemon.name)}>Feed</button></li>

           

          </ul>
        );
      })}
    </div>
  );
};

export default AdoptedPokemon;

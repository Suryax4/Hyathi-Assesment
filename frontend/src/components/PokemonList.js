import React, { useEffect, useState } from "react";
import ModalExampleBasic from "./utility/modal-ui";
// import { Link } from "react-router-dom";
const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [modalTrigger,setModalTrigger] = useState(false)

  useEffect(() => {
    getPokemons();
  },[]);

  const getPokemons = async () => {
    let myHeaders = new Headers();
    let token = sessionStorage.getItem("token")
    myHeaders.append("Authorization",`Bearer ${token}`)
    let reqOptions ={
      method:"GET",
      headers:myHeaders
    }
    let result = await fetch("http://localhost:5010/pokemon",reqOptions);
    result = await result.json();
    setPokemons(result);
  };

  
  const adoptPokemon = async (id) => {
    let myHeaders = new Headers();
    let token = sessionStorage.getItem("token")

    myHeaders.append("Authorization",`Bearer ${token}`)
    const reqBody ={
      method:"POST",
      headers:myHeaders
    }

    let res = await fetch(`http://localhost:5010/pokemon/${id}/adopt`,reqBody);

     res.status === 236 ?setModalTrigger(true):setModalTrigger(false);

  }

  return (
    <div className="product-list">
      <h3>Pokemon List</h3>
      <ModalExampleBasic value={modalTrigger} />
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
            <li><button onClick={()=>adoptPokemon(pokemon._id)}>Adopt</button></li>

          </ul>
        );
      })}
    </div>
  );
};

export default PokemonList;

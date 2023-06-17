import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    let result = await fetch("http://localhost:5010/api/v1/pokemons");
    result = await result.json();
    setPokemons(result.pokemons);
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
          </ul>
        );
      })}
    </div>
  );
};

export default PokemonList;

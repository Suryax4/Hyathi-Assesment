import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bars } from "react-loader-spinner";

// import { Link } from "react-router-dom";
const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const notify = (name) => toast(`${name} Already Adopted`);
  const adopted = (name) => toast(`${name} Adopted Successfully`);

  const getPokemons = async () => {
    let myHeaders = new Headers();
    let token = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);
    let reqOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let result = await fetch("http://localhost:5010/pokemon", reqOptions);
    result = await result.json();
    setPokemons(result);
  };

  const adoptPokemon = async (id, name) => {
    let myHeaders = new Headers();
    let token = sessionStorage.getItem("token");

    myHeaders.append("Authorization", `Bearer ${token}`);
    const reqBody = {
      method: "POST",
      headers: myHeaders,
    };

    let res = await fetch(`http://localhost:5010/pokemon/${id}/adopt`, reqBody);

    if (res.status === 212) {
      adopted(name);
    }

    if (res.status === 236) {
      notify(name);
    }
  };

  const nullData = () => {
    return (
      <div className="center">
        <Bars
          height="80"
          width="80"
          color="skyblue"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          align="center"
        />
      </div>
    );
  };

  return (
    <div className="product-list">
      <ToastContainer />

      {pokemons?.length === 0 ? (
        nullData()
      ) : (
        <div>
          <h1>Pokemon List</h1>

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
                <li>
                  <button
                    className="adoptButton"
                    onClick={() => adoptPokemon(pokemon._id, pokemon.name)}
                  >
                    Adopt
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PokemonList;

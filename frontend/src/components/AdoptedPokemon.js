import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../helper";

// import { Link } from "react-router-dom";
const AdoptedPokemon = () => {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    getPokemons();
  }, []);

  const notify = (id) => toast(`${id} Health Increased by 10`);
  const notify2 = (id) => toast(`${id} Fully Fed`);

  const getPokemons = async () => {
    let myHeaders = new Headers();
    let token = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);
    let reqOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let result = await fetch(`${BASE_URL}/adoptedpokemon`, reqOptions);
    result = await result.json();
    setPokemons(result.list);
  };

  const feedPokemon = async (id) => {
    var myHeaders = new Headers();
    let token = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/pokemon/feed`, requestOptions)
      .then((response) => {
        response.json();
        if (response.status === 260) {
          notify(id);
        }
        if (response.status === 240) {
          notify2(id);
        }
      })
      .then((result) => {
        // console.log(result);

        getPokemons();
      })
      .catch((error) => console.log("error", error));
  };

  const nullData = () => {
    return (
      <div>
        <h1>Please Adopt Pokemon to see them</h1>
      </div>
    );
  };

  return (
    <div className="product-list">
      <ToastContainer />
      {!!pokemons && pokemons?.length === 0 ? (
        nullData()
      ) : (
        <div>
          <h1>Adopted Pokemon</h1>
          <h3>
            Feed the Pokemon as their Health will decrease at a regular interval
            of 10 minutes
          </h3>
          <ul>
            <li>S No.</li>
            <li>Name</li>
            <li>Image</li>
            <li>Breed</li>
            <li>Age</li>
            <li>Health</li>
            <li>Operation</li>
          </ul>

          {pokemons?.map((pokemon, index) => {
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
                    onClick={() => feedPokemon(pokemon.name)}
                  >
                    Feed
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

export default AdoptedPokemon;

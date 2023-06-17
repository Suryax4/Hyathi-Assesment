import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import PokemonList from "./components/PokemonList";

import AdoptedPokemon from "./components/AdoptedPokemon";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<PokemonList />}></Route>
          <Route path="/adopted" element={<AdoptedPokemon />}></Route>
          <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
        </Route>

        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

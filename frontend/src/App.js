import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import PokemonList from "./components/AddPokemon";
import AddPokemon from "./components/AddPokemon";
import FeedPokemon from "./components/FeedPokemon";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<PokemonList />}></Route>
          <Route path="/add" element={<AddPokemon />}></Route>
          <Route path="/update/:id" element={<FeedPokemon />}></Route>
          <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

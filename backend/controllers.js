const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = require("mongoose");
const User = require("./models/User");
const Pokemon = require("./models/Pokemon");

async function initializePokemon(req, res) {
  try {
    const pokemonList = [
      {
        name: "Abra",
        image:
          "https://archives.bulbagarden.net/media/upload/thumb/b/bd/0063Abra.png/105px-0063Abra.png",
        breed: "Psychic",
        age: 7,
        health: 80,
      },
      {
        name: "Pikachu",
        image:
          "https://archives.bulbagarden.net/media/upload/thumb/4/4a/0025Pikachu.png/105px-0025Pikachu.png",
        breed: "Electric",
        age: 5,
        health: 80,
      },
      {
        name: "Raboot",
        image:
          "https://archives.bulbagarden.net/media/upload/thumb/2/20/0814Raboot.png/105px-0814Raboot.png",
        breed: "Fire",
        age: 9,
        health: 80,
      },
      {
        name: "Sawk",
        image:
          "https://archives.bulbagarden.net/media/upload/thumb/7/77/0539Sawk.png/105px-0539Sawk.png",
        breed: "Fighing",
        age: 10,
        health: 80,
      },
      {
        name: "Squirtle",
        image:
          "https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/105px-0007Squirtle.png",
        breed: "Water",
        age: 1,
        health: 80,
      },
      {
        name: "Charmander",
        image:
          "https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/105px-0004Charmander.png",
        breed: "Fire",
        age: 9,
        health: 80,
      },
    ];

    await Pokemon.insertMany(pokemonList);
    res.json({ message: "Pokemon initialized successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to initialize Pokemon" });
  }
}

async function registerUser(req, res) {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(240).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
    });
    await user.save();

    res.status(220).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret");

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
}

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

async function getAvailablePokemon(req, res) {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Pokemon" });
  }
}

async function adoptPokemon(req, res) {
  const { id } = req.params;
  const { userId } = req;

  try {
    // Check if the Pokemon exists
    const pokemon = await Pokemon.findById(id);
    if (!pokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    // Get the user
    const user = await User.findById(userId);

    // Check if the user has already adopted the same breed
    if (user.adoptedPokemon.includes(pokemon.name)) {
      return res
        .status(236)
        .json({ message: "You have already adopted a Pokemon of this name" });
    }

    // Update the Pokemon with the adopting user
    pokemon.adoptedBy = userId;
    await pokemon.save();

    // Update the user's adoptedPokemonBreeds
    user.adoptedPokemon.push(pokemon.name);
    await user.save();

    res.status(212).json({
      message: "Pokemon adopted successfully",
      list: pokemon.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to adopt Pokemon" });
  }

  //console.log(res);
}

async function getAdoptedPokemon(req, res) {
  const { userId } = req;
  // console.log("user,", userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const array1 = [];

    user.adoptedPokemon?.map((x) => {
      array1.push(x);
    });

    const array2 = [];

    array1.forEach(async (val, i) => {
      let temparr = "";
      temparr = await Pokemon.find({ name: val });
      array2.push(...temparr);
    });
    // console.log(array2, "array2");

    setTimeout(() => {
      const sortedArray = array2?.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      res.json({
        list: sortedArray,
      });
    }, 500);
  } catch (error) {
    res.status(500).json({ message: "Failed to get Pokemon" });
  }
}

async function feedPokemon(req, res) {
  // Feed a Pokemon

  const { id } = req.body;
  const { userId } = req;

  try {
    // Find the requesting user and check if they have adopted the Pokemon with the provided ID
    const user = await User.findOne({ _id: userId, adoptedPokemon: id });
    if (!user) {
      return res
        .status(401)
        .json({ message: "You are not authorized to feed this Pokemon" });
    }

    // Find the Pokemon based on the breed
    const pokemon = await Pokemon.findOne({ name: id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    // Update the lastFed timestamp for the Pokemon
    pokemon.lastFed = new Date();
    console.log(pokemon.health);
    pokemon.health = parseInt(pokemon.health) + 10;

    if (pokemon.health > 100) {
      pokemon.health = 100;
      await pokemon.save();
      res.status(240).json({ message: "Pokemon fully fed", data: pokemon });
    } else {
      await pokemon.save();
      res.status(260).json({ message: "Pokemon fed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to feed Pokemon" });
  }
}

module.exports = {
  initializePokemon,
  registerUser,
  loginUser,
  getAvailablePokemon,
  getAdoptedPokemon,
  adoptPokemon,
  feedPokemon,
};

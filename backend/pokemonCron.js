const cron = require("node-cron");
const Pokemon = require("./models/Pokemon");
const User = require("./models/User");

function initializeCronJob() {
  const decreaseHealthCron = cron.schedule("*/1 * * * *", async () => {
    try {
      const thresholdTime = new Date(Date.now() - 1 * 60 * 1000); // 1 minute ago

      // Find all users who haven't fed their Pokemon for 1 minute
      const usersToUpdate = await User.find({
        lastFed: { $lt: thresholdTime },
      });

      // Retrieve the unattended Pokemon from the users
      const unattendedPokemon = usersToUpdate.flatMap(
        (user) => user.adoptedPokemon
      );

      // Decrease the health of the unattended Pokemon by 10
      await Promise.all(
        unattendedPokemon.map(async (pokemonBreed) => {
          const pokemon = await Pokemon.findOne({ name: pokemonBreed });
          if (pokemon && pokemon.health>= 10) {
            pokemon.health -= 10;
            await pokemon.save();
          }
        })
      );

      console.log("Cron job executed: Decreased health of unattended Pokemon");
    } catch (error) {
      console.error("Error executing cron job:", error);
    }
  });

  decreaseHealthCron.start();
}

module.exports = { initializeCronJob };
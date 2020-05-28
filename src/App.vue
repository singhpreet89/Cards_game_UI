<template>
  <div id="app">
    <play-form :insertNewGame="insertNewGame" :backendValidationErrors="backendValidationErrors" />
    <leader-board :results="results" :isBusy="isBusy" />
  </div>
</template>

<script>
  import PlayForm from "./components/PlayForm";
  import LeaderBoard from "./components/LeaderBoard";
  import axios from "axios";

  export default {
    name: "App",
    components: {
      PlayForm,
      LeaderBoard,
    },

    data() {
      return {
        isBusy: true,
        results: [],
        backendValidationErrors: [],
      };
    },

    methods: {
      async insertNewGame (name, handOfCards) {
        try {
          const payload = { user_name: name, hand_of_cards: handOfCards, };
          const response = await axios.post("/game", payload);

          if (response.data.data.result === "Won") {
            this.$toasted.show(`Game WON. Player: ${response.data.data.player_hand_score} Generated: ${response.data.data.generated_hand_score}`, { type: "success" });
          } else {
            if(response.data.data.player_hand_score === response.data.data.generated_hand_score) {
              this.$toasted.show(`Game TIED. Player: ${response.data.data.player_hand_score} Generated: ${response.data.data.generated_hand_score}`, { type: "warning" });
            } else {
              this.$toasted.show(`Game LOST. Player: ${response.data.data.player_hand_score} Generated: ${response.data.data.generated_hand_score}`, { type: "danger" });
            }
          }

          this.updateTable(name, response);
          this.backendValidationErrors = [];
        } catch(error) {
          if (error.response && error.response.status === 422) {
            this.backendValidationErrors = [];
            if(Array.isArray(error.response.data.errors.user_name) && error.response.data.errors.user_name.length) {
              this.backendValidationErrors = [...this.backendValidationErrors, ...error.response.data.errors.user_name];
            }
            if(Array.isArray(error.response.data.errors.hand_of_cards) && error.response.data.errors.hand_of_cards.length) {
              this.backendValidationErrors = [...this.backendValidationErrors, ...error.response.data.errors.hand_of_cards];
            }
          }
        }
      },

      /* Updating table based on the response */
      updateTable(name, response) {
        const sanitizedName = name.replace(/(<([^>]+)>)/ig, '').replace(/[^A-Za-zÀ-ÿ ]/, "").trim();        // Sanitize Name according to the Sanitization in Backend
        const searchUserNameIndex = this.results.findIndex((value) => value.user_name === sanitizedName);   // Searching if the user_name already exist in the 'Leader board' table 
            
        /* If the Game player(Name) is not a first time player and already exists in the database then update the corresponding row in the table */
        if(searchUserNameIndex !== -1) {
          /* Ensure to update the table with Game player's name, Hands won and Games won */
          if(response.data.data.result === "Won") {                                        
            this.results[searchUserNameIndex].number_of_games_won += 1;                                     // Updating Games won, only if the player actually won a game
          }
          this.results[searchUserNameIndex].number_of_hands_won += response.data.data.player_hand_score;    // Updating Hands won all the time, even if the Game is Lost or Tied 
        } 
        /* Else the Game player(Name) is a the first time player and does not exist in the database then create a new row in table */
        else {
          this.results.push({
            'user_name' : response.data.data.user_name, 
            'number_of_hands_won' : response.data.data.player_hand_score, 
            'number_of_games_won' : response.data.data.result === "Won" ? 1 : 0,
          });
        }
      },
    },

    async mounted() {
      try {
        const response = await axios.get("/game");
        this.results = response.data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isBusy = !this.isBusy;
      }
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>


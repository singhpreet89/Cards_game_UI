<template>
  <div class="playForm">
    <h2>Cards game</h2>
    <template v-if="backendValidationErrors.length || errors.length">
      <b-alert variant="danger" show>
        <b>Please correct the following error(s):</b>
        <ul v-if="errors">
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
        <ul v-if="backendValidationErrors">
          <li v-for="(error, i) in backendValidationErrors" :key="i">{{ error }}</li>
        </ul>
      </b-alert>
    </template>

    <b-form @submit="formValidations">
      <b-form-group id="name" label="User's name: *" label-for="name">
        <b-form-input id="name" placeholder="Please enter your name" v-model="name"></b-form-input>
      </b-form-group>

      <b-form-group id="hand_of_cards" label="Hand of cards: *" label-for="hand_of_cards" description="Each card should be separated by a space. For example: 2 4 6 J K A (Valid cards include: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A)">
        <b-form-input id="hand_of_cards" placeholder="Hand of cards" v-model="handOfCards"></b-form-input>
      </b-form-group>
      
      <div style="textAlign: center; width: 100%;">
        <b-button type="submit" variant="primary">Play</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: null,
        handOfCards: null,
        errors: [],
      };
    },

    props: {
      insertNewGame: Function,
      backendValidationErrors: Array,
    },

    methods: {
      formValidations: function(event) {
        this.errors = [];

        if (!this.name) {
          this.errors.push("The user name field is required.");
        }
        if (!this.handOfCards) {
          this.errors.push("The hand of cards field is required.");
        }
        if(!this.errors.length) {
          this.insertNewGame(this.name, this.handOfCards);
          // this.name = null;
          // this.handOfCards = null;
        }
        event.preventDefault();
      },
    },
  };
</script>

<style scoped>
  .playForm {
    width: 70%;
    margin: 30px auto;
  }

</style>

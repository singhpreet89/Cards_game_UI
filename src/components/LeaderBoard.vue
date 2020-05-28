<template>
  <div class="leaderBoard">
    <h2>Leaderboard</h2>
    <b-table id="results-table" sort-icon-left striped hover :items="results" :fields="fields" :per-page="perPage" :current-page="currentPage" :busy="isBusy" show-empty>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="results-table" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" align="right"></b-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        perPage: 10,
        currentPage: 1,
        fields: [
          { key: "user_name", label: "User name", sortable: true, },
          { key: "number_of_hands_won", label: "Hands won", sortable: true, },
          { key: "number_of_games_won", label: "Games won", sortable: true, },
        ],
      };
    },

    props: {
      results: Array,
      isBusy: Boolean,
    },

    computed: {
      rows() {
        return this.results.length;
      },
    },
  };
</script>

<style scoped>
  .leaderBoard {
    width: 70%;
    margin: 40px auto;
  }

  h2 {
    text-align: center;
  }
</style>

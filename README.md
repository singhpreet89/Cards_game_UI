# Cards game UI
<p align="center">
	<a href="https://vuejs.org/" alt="MADE WITH: VUE">
		<img src="https://forthebadge.com/images/badges/made-with-vue.svg" />
	</a>
</p>
<p align="center">
	<a href="https://nodejs.org/en/" alt="Powered by: Node v14.1.0">
        <img src="https://badgen.net/badge/Powered%20by/Node%20v14.1.0/43853D" />
    </a>
	<a href="https://opensource.org/licenses/MIT" alt="License: MIT">
		<img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
	</a>
</p>

## Introduction

- An Input field which allows users to enter a hand of cards, each card should be
separated by a space. For example: 2 4 6 J K A (Valid cards include: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A)
- When the "**player"** makes a **POST** request with the **user_name** and **hand_of_cards** (i.e. Request format defined in the **Endpoints** section) , a random "**hand of cards"** with the same  amount of cards that the user entered are generated.
- The **"player's"** hand of cards is then compared to the generated hand of cards.
- Each card in the **"player's"**hand is compared to the card in the same position in
the generated hand. Highest value card wins. For example:
**Player's hand: 5 7 A K
Generated Hand: 4 8 K Q**
A score is calculated for the **"player"** and **"generated"** hand, in this example it would
be:
**Player: 3
Generated: 2**
- The result of the game is then displayed back to the **"player"**. 

## Installation and Requirements
- Install [Node](https://nodejs.org/en/).
- Clone the repository.
- Use the Node Package Manager [npm](https://www.npmjs.com/) to install the required dependencie by navigating to the root directory of the cloned repository.
```bash
npm init
```

## Running the application
1. Make sure that the REST API for the **"Cards game API"** is already running.
2. Navigate to the root directory and run the following command:
```bash
npm run serve
```
3. Run the UI to play the **Cards game** at:  http://localhost:8080/
4. **PLAY:** Enter the **User name** and **Hand of cards** and click on the **"Play"** button.
  - Leaderboard table displays **Player's name, total number of "games" and "hands" "** won by each **player**.

## License
[MIT](https://choosealicense.com/licenses/mit/)
<template>
  <div id="gameRoom" v-if="playerEnteredRoom">
    <PlayerBadge playerName="Speedy" role="Agent" />
    <PlayerRoom :gameSetup="gameSetup" @performMaintenance="PerformMaintenance($event)" />
    <GameNodes :nodes="gameSetup.nodes" />
  </div>
  <div id="enterNameDiv" v-else>
    <h1 style="color: white">
      Before you enter the room, enter your name!
    </h1>
    <div id="enterName">
    <input type="text" id="name" :value="value" @input="OnInputChange">
    <button class="mindnightButton" @click="DisplayGameRoom">Enter</button>
  </div>
  </div>
</template>

<script lang="ts">
import PlayerRoom from './components/PlayerRoom.vue';
import GameNodes from './components/GameNodes.vue';
import PlayerBadge from './components/PlayerBadge.vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import GameSetup from './types/GameSetup';
import GameProgress from './types/GameProgress';

export default defineComponent({
  components: {
    PlayerRoom,
    GameNodes,
    PlayerBadge
  },
  mounted() {
  },
  data() {
    return {
      gameSetup: {} as GameSetup,
      playerName: "Kaneran",
      currentNode: 1,
      playerEnteredRoom: false,
      value: ""
    }
  },
  methods: {
    PerformMaintenance(gameProgress: GameProgress) {
      axios.post('https://localhost:7240/maintenance', gameProgress)
    },
    DisplayGameRoom() {
      axios.get(`https://localhost:7240/Game?playerName=${this.value}`).then((response) => this.gameSetup = response.data)
      this.playerEnteredRoom = !this.playerEnteredRoom
      var inGameAudio = new Audio(require('../src/assets/sounds/ingametheme.mp3'))
      inGameAudio.loop = true
      inGameAudio.play()
    },
    OnInputChange($event: any){
      this.value = $event.originalTarget.value
    }
  }
})

</script>

<style>
@font-face {
  font-family: "Mouse";
  src: url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.eot");
  src: url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.woff") format("woff"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.svg#Mouse") format("svg");
}

#app {
  font-family: "Mouse", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/images/stage.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

#gameRoom {
  display: flex;
  width: auto;
}

#name {
  padding: 10px;
  margin-bottom: 10px;
  font-family: inherit;
  font-size: x-large;
}

.mindnightButton {
  padding: 10px 60px 10px 60px;
  font-family: "Mouse", Helvetica, Arial, sans-serif;
  font-size: x-large;
}

#enterName{
  display:flex;
  flex-direction: column;
  align-items: center;
}

#enterNameDiv{
  height: 100vh;
}
</style>

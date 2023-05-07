<template>
  <PlayerBadge playerName="Speedy" role="Agent"/>
  <PlayerRoom :gameSetup="gameSetup" @performMaintenance="PerformMaintenance($event)"/>
  <GameNodes :nodes="gameSetup.nodes"/>
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
    axios.get(`https://localhost:7240/Game?playerName=Kaneran`).then((response) => this.gameSetup = response.data)
    var audio = new Audio(require('../src/assets/sounds/ingametheme.mp3'))
    audio.loop = true;
    audio.play()
  },
  data() {
    return {
      gameSetup: {} as GameSetup,
      playerName: "Kaneran",
      currentNode: 1
    }
  },
  methods: {
    PerformMaintenance(gameProgress: GameProgress) {
      axios.post('https://localhost:7240/maintenance', gameProgress)
    }
  }
})

</script>

<style>
@font-face {font-family: "Mouse"; src: url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.eot"); src: url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.woff") format("woff"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.svg#Mouse") format("svg"); } 
#app {
  font-family: "Mouse", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width:auto;
  background-image: url('./assets/images/stage.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

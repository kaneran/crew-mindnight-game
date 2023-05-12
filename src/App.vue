<template>
  <div id="gameRoom" v-if="playerEnteredRoom">
    <PlayerBadge playerName="Speedy" role="Agent" />
    <PlayerRoom :gameSetup="gameSetup" :gameProgress="gameProgress" :maintenanceCompleted="maintenanceCompleted" :maintenanceInProgress="maintenanceInProgress" @performMaintenance="PerformMaintenance($event)" :playerName="playerName" />
    <GameNodes :gameSetup="gameSetup" :gameProgress="gameProgress" />
  </div>
  <div id="enterNameDiv" v-else>
    <h1 style="color: white">
      Wait! You haven't told us your your name!
    </h1>
    <div id="enterName">
    <input type="text" id="name" :value="playerName" @input="OnInputChange">
    <button class="mindnightButton" @click="DisplayGameRoom">Submit</button>
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
import Outcome from './types/Outcome';
import Player from './types/Player';

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
      playerEnteredRoom: false,
      playerName: "",
      gameProgress: {node: 1, audit: [] as Outcome[], participants: [] as Player[]} as GameProgress,
      maintenanceInProgress: false,
      maintenanceCompleted : false
    }
  },
  methods: {
    PerformMaintenance(progress: GameProgress) {
      this.maintenanceInProgress = !this.maintenanceInProgress
      axios.post('https://localhost:7240/maintenance', progress).then((response) => {
        setTimeout(() => {
          console.log("Play sound...")
          console.log("Maintenance in progress...")
          this.maintenanceCompleted = !this.maintenanceCompleted
          this.maintenanceInProgress = !this.maintenanceInProgress
          this.gameProgress.audit?.push(response.data);
        },3000);
        
      }).then(() => {
        //Resume game
        setTimeout(() => {
          this.maintenanceCompleted = !this.maintenanceCompleted
          this.gameProgress.node++;
        },4000);
      });
    },
    DisplayGameRoom() {
      axios.get(`https://localhost:7240/Game?playerName=${this.playerName}`).then((response) => this.gameSetup = response.data)
      this.playerEnteredRoom = !this.playerEnteredRoom
      var inGameAudio = new Audio(require('../src/assets/sounds/ingametheme.mp3'))
      inGameAudio.loop = true
      inGameAudio.play()
    },
    OnInputChange($event: any){
      this.playerName = $event.originalTarget.value
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
  height: 100vh;
}

#gameRoom {
  display: flex;
  width: auto;
  height: 100vh;
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

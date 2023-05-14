<template>
  <div id="appMain" :class="!maintenanceInProgress ? 'showStage' : ''">
    <div id="gameRoom" v-if="playerEnteredRoom">
      <PlayerBadge :player="gameSetup.players?.find(p => p.name === playerName)" />
      <PlayerRoom :gameSetup="gameSetup" :gameProgress="gameProgress" :maintenanceCompleted="maintenanceCompleted"
        :maintenanceInProgress="maintenanceInProgress" @performMaintenance="PerformMaintenance($event)" @gameOverActionPerformed="HandleGameOverAction($event)"
        :playerName="playerName" />
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
import {checkGameOver} from '../src/utils';

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
      gameProgress: { node: 1, audit: [] as Outcome[], participants: [] as Player[] } as GameProgress,
      maintenanceInProgress: false,
      maintenanceCompleted: false,
      inGameAudio: new Audio(require('../src/assets/sounds/ingametheme.mp3'))
    }
  },
  methods: {
    PerformMaintenance(progress: GameProgress) {
      this.maintenanceInProgress = !this.maintenanceInProgress
      axios.post('https://localhost:7240/maintenance', progress).then((response) => {
        setTimeout(() => {
          this.gameProgress.audit?.push(response.data)
          if (!checkGameOver(this.gameProgress)) {
            var auditNode = this.gameProgress.node - 1
            var outcomeAudioFilename = this.gameProgress.audit[auditNode].result === "Secured" ? "secured.mp3" : "hacked.mp3"
            var outcomeAudio = new Audio(require(`../src/assets/sounds/${outcomeAudioFilename}`))
            outcomeAudio.play()
            this.maintenanceCompleted = !this.maintenanceCompleted
          }
          this.maintenanceInProgress = !this.maintenanceInProgress
        }, 3000);

      }).then(() => {
        //Resume game
        setTimeout(() => {
          if (!checkGameOver(this.gameProgress)) {
            this.maintenanceCompleted = !this.maintenanceCompleted
          }
          this.gameProgress.node++
        }, 5000);
      });
    },
    HandleGameOverAction(action: string){
      this.inGameAudio.pause()
      if(action === 'exit'){
        this.playerName = ''
        this.playerEnteredRoom = !this.playerEnteredRoom
      } else if(action === 'retry'){
        this.CreateGame()
      }
    },
    DisplayGameRoom() {
      this.CreateGame()
      this.playerEnteredRoom = !this.playerEnteredRoom
    },
    OnInputChange($event: any) {
      this.playerName = $event.originalTarget.value
    },
    CreateGame(){
      this.gameProgress = { node: 1, audit: [] as Outcome[], participants: [] as Player[] } as GameProgress
      axios.get(`https://localhost:7240/Game?playerName=${this.playerName}`).then((response) => {
        this.gameSetup = response.data
      })
      this.inGameAudio.loop = true
      this.inGameAudio.play()
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
  height: 100vh;
}

.showStage {
  background-image: url('./assets/images/stage.jpg');
  background-size: cover;
  background-repeat: no-repeat;
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
  margin: 10px;
}

#enterName {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#enterNameDiv {
  height: 100vh;
}

.hacker {
  color: #e00b1d;
  font-size: x-large;
}

.agent {
  color: green;
  font-size: x-large;
}
</style>

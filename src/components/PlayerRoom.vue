<script lang="ts">
import MindnightPlayer from './MindnightPlayer.vue';
import TeamProposition from './TeamProposition.vue';
import GameMission from './GameMission.vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import Player from '@/types/Player';


export default defineComponent({
  components: {
    MindnightPlayer,
    TeamProposition,
    GameMission
  },
  mounted() {
    axios.get(`https://localhost:7240/Game?playerName=Kaneran`).then((response) => this.players = response.data)
  },
  methods: {
    ChangeProposition(player: Player) {
      //If selected player has already been selected, remove them from proposition
      if (this.participants.includes(player)) {
        this.participants = this.participants.filter((p) => p.name !== player.name)
        //If there is space for another participant to part of the proposition then add them
      } else if (this.participants.length !== 3) {
        this.participants.push(player)
      }
    }
  },
  data() {
    return {
      participants: [] as Player[],
      players: [] as Player[],
      playerName: "Kaneran"
    }
  }
})
</script>

<template>
  <div id="roomDiv">
    <GameMission role="Agent" objective="SECURE 3 NODES" />
    <div id="playersDiv">
      <div>
        <MindnightPlayer v-for="player in players.slice(0, 2)" :key="player.id" :player="player" imagePosition="left"
          @changeProposition="ChangeProposition($event)" />
      </div>
      <div class="middle">
        <MindnightPlayer v-for="player in players.slice(2, 4)" :key="player.id" :player="player" imagePosition="left"
          @changeProposition="ChangeProposition($event)" />
      </div>
      <div>
        <MindnightPlayer v-for="player in players.slice(4, 6)" :key="player.id" :player="player" imagePosition="left"
          @changeProposition="ChangeProposition($event)" />
      </div>
    </div>
    <TeamProposition :player="players.find(p => p.name = playerName)" :participants="participants" />
  </div>
</template>

<style scoped>
#roomDiv {
  border: 5px solid red;
  flex-grow: 5;
  min-height: 90vh;
}

#playersDiv {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

#playersDiv>div {
  display: flex;
}

#playersDiv>div.middle {
  justify-content: space-between;
}</style>
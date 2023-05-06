<script lang="ts">
import MindnightPlayer from './MindnightPlayer.vue';
import TeamProposition from './TeamProposition.vue';
import GameMission from './GameMission.vue';
import { PropType, defineComponent } from 'vue';
import Player from '@/types/Player';
import GameSetup from '@/types/GameSetup';


export default defineComponent({
  props:{
    gameSetup: {} as PropType<GameSetup>
  },
  components: {
    MindnightPlayer,
    TeamProposition,
    GameMission
  },
  methods: {
    ChangeProposition(player: Player) {
      //If selected player has already been selected, remove them from proposition
      if (this.participants.includes(player)) {
        this.participants = this.participants.filter((p) => p.name !== player.name)
        //If there is space for another participant to part of the proposition then add them
      } else if (this.participants.length !== this.gameSetup?.nodes?.find(n => n.id == this.currentNode)?.numberOfParticipantsRequired) {
        this.participants.push(player)
      }
    }
  },
  data() {
    return {
      participants: [] as Player[],
      playerName: "Kaneran",
      currentNode: 1
    }
  }
})
</script>

<template>
  <div id="roomDiv">
    <GameMission role="Agent" objective="SECURE 3 NODES" />
    <p>Node {{ currentNode }}</p>
    <p id="selectPhase">Select Phase</p>
    <div id="playersDiv">
      <div>
        <MindnightPlayer v-for="player in gameSetup.players?.slice(0, 2)" :key="player.id" :player="player" imagePosition="left"
          @changeProposition="ChangeProposition($event)" />
      </div>
      <div class="middle">
        <MindnightPlayer v-for="player in gameSetup.players?.slice(2, 4)" :key="player.id" :player="player" imagePosition="left"
          @changeProposition="ChangeProposition($event)" />
      </div>
      <div>
        <MindnightPlayer v-for="player in gameSetup.players?.slice(4, 6)" :key="player.id" :player="player" imagePosition="left"
          @changeProposition="ChangeProposition($event)" />
      </div>
    </div>
    <TeamProposition :player="gameSetup.players?.find(p => p.name = playerName)" :participants="participants" :nodes="gameSetup?.nodes" :currentNode="currentNode" />
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
}

#selectPhase {
  font-size: large;
}
</style>
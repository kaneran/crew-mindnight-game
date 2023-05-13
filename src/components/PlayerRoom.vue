<script lang="ts">
import MindnightPlayer from './MindnightPlayer.vue';
import TeamProposition from './TeamProposition.vue';
import GameMission from './GameMission.vue';
import { PropType, defineComponent } from 'vue';
import Player from '@/types/Player';
import GameSetup from '@/types/GameSetup';
import GameProgress from '@/types/GameProgress';
import ParticipantList from './ParticipantList.vue';
import GameOverData from '@/types/GameOverData';
import GameOver from './GameOver.vue';

export default defineComponent({
  props: {
    gameSetup: {} as PropType<GameSetup>,
    gameProgress: {} as PropType<GameProgress>,
    maintenanceCompleted: Boolean,
    maintenanceInProgress: Boolean,
    playerName: String
  },
  components: {
    MindnightPlayer,
    TeamProposition,
    GameMission,
    ParticipantList,
    GameOver
  },
  methods: {
    ChangeProposition(player: Player) {
      if (this.participants.length !== this.participantsArchive.length) {
        this.participantsArchive = []
      }
      //If selected player has already been selected, remove them from proposition
      if (this.participants.includes(player)) {
        this.participants = this.participants.filter((p) => p.name !== player.name)
        //If there is space for another participant to part of the proposition then add them
      } else if (this.participants.length !== this.gameSetup?.nodes?.find(n => n.id == this.gameProgress?.node)?.numberOfParticipantsRequired) {
        this.participants.push(player)
        this.participantsArchive.push(player)
      }
    },
    PerformMaintenance(gameProgress: GameProgress) {
      this.participants = []
      this.$emit('performMaintenance', gameProgress)
    }
  },
  data() {
    return {
      participants: [] as Player[],
      participantsArchive: [] as Player[]
    }
  },
  computed: {
    auditIndex() {
      return this.gameProgress === undefined ? 0 : this.gameProgress?.node - 1
    },
    nodesSecuredCount(){
      return this.gameProgress?.audit.filter(node => node.result === "Secured").length
    },
    objective(){
      const nodesLeftToSecure = 3 - (this.nodesSecuredCount ? this.nodesSecuredCount : 0);
      return `SECURE ${nodesLeftToSecure} NODES`;
    },
    finalGameData() {
      const agentsWin = this.nodesSecuredCount === 3
      const hackersWin = this.gameProgress?.audit.filter(node => node.result === "Hacked").length === 3
      const hackers = this.gameSetup?.players?.filter(p => p.role === "Hacker")
      if (agentsWin) {
        return { hackersWin: false, message: "AGENTS WIN", participants: hackers } as GameOverData
      } else if (hackersWin) {
        return { hackersWin: true, message: "HACKERS WIN", participants: hackers} as GameOverData
      } else {
        return {}
      }
    }
  }
})
</script>

<template>
  <div id="roomDiv">
    <GameMission role="Agent" :objective="objective" />
    <p>Node {{ gameProgress?.node > 5 ? 5 : gameProgress?.node }}</p>
    <p id="selectPhase">Select Phase</p>
    <div id="playersDiv">
      <div>
        <MindnightPlayer v-for="player in gameSetup.players?.slice(0, 2)" :key="player.id" :player="player"
          imagePosition="left" @changeProposition="ChangeProposition($event)" />
      </div>
      <div class="middle">
        <MindnightPlayer v-for="player in gameSetup.players?.slice(2, 3)" :key="player.id" :player="player"
          imagePosition="left" @changeProposition="ChangeProposition($event)" />
        <div v-if="maintenanceInProgress">NODE MAINTENANCE IN PROGRESS...
          <ParticipantList :participants="participantsArchive" />
        </div>
        <div v-else-if="maintenanceCompleted">
          <div v-if="gameProgress?.audit[auditIndex]?.result === 'Hacked'">
            <p>NODE {{ gameProgress?.node }} COMPROMISED</p>
            <p>{{ gameProgress?.audit[auditIndex]?.numberOfHackersDetected }} hacker{{
              gameProgress?.audit[auditIndex]?.numberOfHackersDetected == 2 ? 's' : '' }} detected</p>
          </div>
          <div v-else>
            <p>NODE {{ gameProgress?.node }} SECURED</p>
            <p>No hackers detected</p>
          </div>
        </div>
        <div v-else>
          <TeamProposition v-if="finalGameData.message === undefined"
            :player="gameSetup.players?.find(p => p.playerConfig.playerName == playerName)" :participants="participants"
            :nodes="gameSetup?.nodes" :gameProgress="gameProgress" @performMaintenance="PerformMaintenance($event)" />
          <GameOver v-else :finalGameData="finalGameData"/>
        </div>

        <MindnightPlayer v-for="player in gameSetup.players?.slice(3, 4)" :key="player.id" :player="player"
          imagePosition="left" @changeProposition="ChangeProposition($event)" />
      </div>
      <div>
        <MindnightPlayer v-for="player in gameSetup.players?.slice(4, 6)" :key="player.id" :player="player"
          imagePosition="left" @changeProposition="ChangeProposition($event)" />
      </div>
    </div>
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
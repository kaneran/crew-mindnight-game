<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MindnightPlayer from './MindnightPlayer.vue';
import TeamProposition from './TeamProposition.vue';
import GameMission from './GameMission.vue';

@Options({
  components: {
    MindnightPlayer,
    TeamProposition,
    GameMission
  },
})
export default class PlayerRoom extends Vue {}
</script>

<template>
    <div id="roomDiv">
        <GameMission role="Agent" objective="SECURE 3 NODES"/>
        <div id="playersDiv">
        <MindnightPlayer playerName="Speedy" imagePosition="left"/>
        <MindnightPlayer playerName="Kane" imagePosition="right"/>
        <MindnightPlayer playerName="NobodyEpic" imagePosition="left"/>
        <MindnightPlayer playerName="ShadowBeatz" imagePosition="left"/>
        <MindnightPlayer playerName="SideArms" imagePosition="left"/>
      </div>
        <TeamProposition playerName="Speedy" :participants="['Speedy','ShadowBeatz']"/>
    </div>
</template>

<style scoped>
#roomDiv{
  border: 5px solid red;
  flex-grow: 5;
  min-height: 90vh;
}
#playersDiv{
  display: flex;
  flex-wrap: wrap;
}
</style>
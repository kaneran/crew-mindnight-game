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
    <div>
        Player Room
        <p>Where to populate the players</p>
        <GameMission role="Agent" objective="SECURE 3 NODES"/>
        <MindnightPlayer playerName="Speedy" imagePosition="left"/>
        <TeamProposition playerName="Speedy" :participants="['Speedy','ShadowBeatz']"/>
    </div>
</template>
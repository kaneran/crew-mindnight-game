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
      axios.get("https://localhost:7240/Game?playerName=test").then((response) => this.players = response.data)
  },
  methods:{
    ChangeProposition(playerName: string){
      //If selected player has already been selected, remove them from proposition
      if(this.participants.includes(playerName)){
        this.participants = this.participants.filter((p) => p !== playerName)
        //If there is space for another participant to part of the proposition then add them
      } else if(this.participants.length !== 2){
        this.participants.push(playerName)
      }
    }
  },
  data(){
    return{
      participants:[] as string[],
      players: [] as Player[]
    }
  }
})
</script>

<template>
    <div id="roomDiv">
        <GameMission role="Agent" objective="SECURE 3 NODES"/>
        <div id="playersDiv" v-for="player in players" :key="player.id">
          <MindnightPlayer :playerName="player.name" imagePosition="left" @changeProposition="ChangeProposition($event)" />
        <!-- <MindnightPlayer playerName="Speedy" imagePosition="left" @changeProposition="ChangeProposition($event)" />
        <MindnightPlayer playerName="Kane" imagePosition="right" @changeProposition="ChangeProposition($event)"/>
        <MindnightPlayer playerName="NobodyEpic" imagePosition="left" @changeProposition="ChangeProposition($event)"/>
        <MindnightPlayer playerName="ShadowBeatz" imagePosition="left" @changeProposition="ChangeProposition($event)"/>
        <MindnightPlayer playerName="SideArms" imagePosition="left" @changeProposition="ChangeProposition($event)"/> -->
      </div>
        <TeamProposition playerName="Speedy" :participants="participants"/>
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
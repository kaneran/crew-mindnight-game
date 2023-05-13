<script lang="ts">
import Node from '@/types/Node';
import Player from '@/types/Player';
import GameProgress from '@/types/GameProgress';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import ParticipantList from './ParticipantList.vue';

/* eslint-disable */
export default defineComponent({
  components: {
    ParticipantList
  },
  props: {
    player: {} as PropType<Player>,
    participants: Array as PropType<Player[]>,
    nodes: Array as PropType<Node[]>,
    gameProgress: {} as PropType<GameProgress>
  },
  computed:{
    NumberOfParticipantsRequired(){
      return this.nodes?.find(n => n.id == this.gameProgress?.node)?.numberOfParticipantsRequired
    }
  },
  methods: {
    PerformMaintenance(){
      var acceptedAudio = new Audio(require('../assets/sounds/accepted.mp3'))
      acceptedAudio.play()
      this.$emit('performMaintenance', {participants:this.participants, node: this.gameProgress?.node, audit: this.gameProgress?.audit} as GameProgress)
    }
  }
})

</script>

<template>
  <div>
    <div>
    <p :style="{color: player?.playerConfig.playerTextColour}">{{ player?.name }}</p>
    <p>&nbsp;is proposing</p>
  </div>
    <p>{{ participants?.length }}/{{ nodes?.find(n => n.id == gameProgress?.node)?.numberOfParticipantsRequired }}</p>
    <ParticipantList :participants="participants"/>
    <button id="proposeButton" class="mindnightButton" @click="PerformMaintenance" :disabled="participants?.length != NumberOfParticipantsRequired">Propose</button>
  </div>
</template>

<style scoped>
#proposeButton, p{
  font-size: x-large;
}
</style>
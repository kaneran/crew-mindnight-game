<script lang="ts">
import Player from '@/types/Player';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    player: {} as PropType<Player>,
    participants: Array as PropType<Player[]>
  }
})

</script>

<template>
  <div>
    <div>
    <p :style="{color: player?.playerConfig.playerTextColour}">{{ player?.name }}</p>
    <p>&nbsp;is proposing</p>
  </div>
    <p>{{ participants?.length }}/3</p>
    <div id="participantsList">
      <div v-for="(participant, index) in participants">
        <p :style="{color: participant.playerConfig.playerTextColour}">{{ participant.name }}</p>
        <p v-if="index !== participants?.length - 1"> , </p>
      </div>
    </div>
    <button id="proposeButton">Propose</button>
  </div>
</template>

<style scoped>
#participantsList{
  display:flex;
  justify-content: center;
}

#proposeButton{
  padding: 10px 60px 10px 60px;
  font-family: "Mouse", Helvetica, Arial, sans-serif;
}

#participantsList > div, #proposeButton, p{
  font-size: x-large;
}

#participantsList > div{
  display: flex;
}
</style>
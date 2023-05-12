<script lang="ts">
import { PropType, defineComponent } from 'vue';
import Player from '@/types/Player';

export default defineComponent({
  props: {
    participants: Array as PropType<Player[]>,
    reduceFontSize: Boolean
  }
})
</script>

<template>
    <div id="participantsList">
      <div v-for="(participant, index) in participants" :key="index" :style="{fontSize: reduceFontSize ? 'large' : 'x-large'}">
        <p :style="{color: participant.playerConfig.playerTextColour}">{{ participant.name }}</p>
        <p v-if="index !== participants?.length - 1"> , </p>
      </div>
    </div>
</template>

<style scoped>
#participantsList{
  display:flex;
  justify-content: center;
}

#participantsList > div{
  font-size: x-large;
}

#participantsList > div{
  display: flex;
}
</style>
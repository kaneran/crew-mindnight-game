<script lang="ts">
import { defineComponent } from 'vue';
import Player from '@/types/Player';
import type { PropType } from 'vue'

/* eslint-disable */
export default defineComponent({
  props: {
    player: {} as PropType<Player>,
    imagePosition: String
  },
  methods: {
    passPlayerName() {
      this.$emit('changeProposition', this.player)
    }
  },
  data() {
    return {
      topAndBottomIds: [0, 1, 4, 5]
    }
  }
})

</script>

<template>
  <div @click="passPlayerName"
    :class="{ topOrBottom: player?.id && topAndBottomIds.includes(player.id) || player?.id == 0 }">
    <img :src="require(`@/assets/${player?.playerConfig.playerCharacterFileName}.png`)" :alt="player?.name" :class="{ left: player?.id % 2  == 0 || player?.id == 0 }" />
    <p :style="{ color: player?.playerConfig.playerTextColour}">{{ player?.name }}</p>
  </div>
</template>

<style scoped>
img {
  width: 60px;
}

img.left {
  transform: scaleX(-1);
}

div.topOrBottom {
  flex-grow: 1;
}

div {
  min-width: 35%;
  border: 5px solid green;
}
</style>
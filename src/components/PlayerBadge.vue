<script lang="ts">
import Player from "@/types/Player";
import { defineComponent, PropType } from "vue";

/* eslint-disable */
export default defineComponent({
  props: {
    player: {} as PropType<Player>,
  },
});
</script>

<template>
  <div id="playerBadgeDiv">
    <div id="playerBadgeDataDiv">
    <img :src="require(`@/assets/images/agent_badge.png`)" :style="{ height: '80px' }" />
    <div id="playerDataDiv">
      <div id="roleDiv">
        <p :style="{ color: player?.playerConfig.playerTextColour }">
          {{ player?.name }}
        </p>
        <p>&nbsp;(You)</p>
      </div>
      <p>{{ player?.role }}</p>
    </div>
  </div>
  </div>
</template>

<style scoped>
div {
  border: 5px solid blue;
}

#playerBadgeDiv {
  display: flex;
}

#playerDataDiv{
  display: flex;
  flex-direction: column;
}

#playerDataDiv p {
  margin: 0px;
}

#playerDataDiv > p {
  font-size: large;
}

#roleDiv{
  display: flex;
  font-size: x-large;
}

#playerBadgeDataDiv{
  display: flex;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import GameProgress from '@/types/GameProgress';
import NodeInformation from './NodeInformation.vue';
import GameSetup from '@/types/GameSetup';

/* eslint-disable */
export default defineComponent({
  props: {
    gameProgress: {} as PropType<GameProgress>,
    gameSetup: {} as PropType<GameSetup>,
    nodeId: Number
  },
  data(){
    return {
      nodeMap : {uncompleted: "#3b3d41", secured: "#1e8559", hacked: "#751b12"}
    }
  },
  computed: {
    auditIndex(){
      return this.nodeId === undefined ? 0 : this.nodeId - 1;
    }
  },
  components: { NodeInformation }
})

</script>

<template>
  <div id="gameNode" :style="{backgroundColor: gameProgress?.audit[auditIndex]?.result ? nodeMap[gameProgress?.audit[auditIndex]?.result.toLowerCase()] : nodeMap['uncompleted']}">
    <div style="text-align:center;">
      <div class="tooltip">
        <p>{{ gameSetup?.nodes[nodeId ? nodeId : 0]?.numberOfParticipantsRequired }}</p>
        <p>players</p>
        <span class="tooltiptext">
          <NodeInformation :outcome="gameProgress?.audit[auditIndex]" :gameSetup="gameSetup"/>
        </span>
        
      </div>

    </div>
  </div>
</template>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 180px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

#gameNode{
  border-radius: 100%;
  padding: 50px 5px 50px 5px;
  margin: 20px;
}
</style>
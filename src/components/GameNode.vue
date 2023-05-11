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
  computed: {
    auditIndex(){
      return this.nodeId === undefined ? 0 : this.nodeId - 1;
    }
  },
  components: { NodeInformation }
})

</script>

<template>
  <div>

    <div style="text-align:center;">
      <div class="tooltip">Hover over me
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
  width: 120px;
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
</style>
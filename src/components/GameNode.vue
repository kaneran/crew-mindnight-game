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
      nodeBackgroundColourMap : {current: "#ffffff", uncompleted: "#3b3d41", secured: "#1e8559", hacked: "#751b12"},
      nodeTextColourMap : {current: "#000000", uncompleted: "#d1cbcb", secured: "#9ed9a2", hacked: "#d6b6b6"}
    }
  },
  computed: {
    auditIndex(){
      return this.nodeId === undefined ? 0 : this.nodeId - 1;
    },
    backgroundColour(){
      let value;
      if(this.gameProgress?.node === this.nodeId){
        value = "current"
      }else{
        value = this.gameProgress?.audit[this.auditIndex]?.result ? this.gameProgress?.audit[this.auditIndex]?.result?.toLowerCase() : 'uncompleted'
      }
      return value
    },
    fontColour(){
      let value;
      if(this.gameProgress?.node === this.nodeId){
        value = "current"
      }else{
        value = this.gameProgress?.audit[this.auditIndex]?.result ? this.gameProgress?.audit[this.auditIndex]?.result.toLowerCase() : 'uncompleted'
      }
      return value
    }
  },
  components: { NodeInformation }
})

</script>

<template>
  <div id="gameNode" :style="{backgroundColor: nodeBackgroundColourMap[backgroundColour]}">
    <div style="text-align:center;">
      <div class="tooltip">
        <p :style="{color:nodeTextColourMap[fontColour]}">{{ gameSetup?.nodes[auditIndex]?.numberOfParticipantsRequired }}</p>
        <p :style="{color:nodeTextColourMap[fontColour]}">players</p>
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
  padding: 50px 50px 50px 50px;
  margin: 20px;
}

.test{
  color:black
}
</style>